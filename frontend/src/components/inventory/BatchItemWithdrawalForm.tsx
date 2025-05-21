import { useState, useEffect } from "react";
import BackLink from "../common/BackLink/BackLink";
import Button from "../common/Button/Button";
import ButtonGroup from "../common/ButtonGroup/ButtonGroup";
import FilterDatalist from "../common/FilterDatalist/FilterDatalist";
import { useVolunteersWithRank } from "@/hooks/inventory/querys/useVolunteersWithRank";
import { useAllItems } from "@/hooks/inventory/querys/useAllItems";
import {
  MovementDetail,
  BatchItemWithdrawalSchema,
  BatchItemWithdrawalForm as BatchItemWithdrawalFormType,
} from "@/types/invetory.schema";
import { useRegisterBatchWithdrawal } from "@/hooks/inventory/mutations/useRegisterBatchWithdrawal";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorFormMessage from "../common/ErrorFormMessage/ErrorFormMessage";
import toast from "react-hot-toast";
import Loader from "../common/Loader";

export default function BatchItemWithdrawalForm() {
  const { data: volunteers, isLoading: isLoadingVolunteers } = useVolunteersWithRank();
  const { data: items, isLoading: isLoadingItems } = useAllItems();
  const isLoadingForm = isLoadingVolunteers || isLoadingItems;
  const { mutate, isPending } = useRegisterBatchWithdrawal();
  const navigate = useNavigate();

  const volunteerOptions = volunteers?.map(v => ({
    id: v.volunteerId,
    name: `${v.abbreviation} ${v.lastName} ${v.firstName}`,
  })) ?? [];

  const itemOptions = items?.map(i => ({
    id: i.itemId,
    name: i.name,
  })) ?? [];

  const { control, handleSubmit: formSubmit, formState: { errors }, setValue, trigger } = useForm<BatchItemWithdrawalFormType>({
    resolver: zodResolver(BatchItemWithdrawalSchema),
    defaultValues: {
      volunteerId: "",
      items: []
    } as any
  });

  const [selectedVolunteerName, setSelectedVolunteerName] = useState('');
  const [selectedItemName, setSelectedItemName] = useState('');
  const [selectedItems, setSelectedItems] = useState<MovementDetail[]>([]);

  useEffect(() => {
    setValue('items', selectedItems);
    if (selectedItems.length > 0) {
      trigger('items');
    }
  }, [selectedItems, setValue, trigger]);

  const handleAddItem = () => {
    const selected = itemOptions.find(i => i.name === selectedItemName);
    if (!selected) return;

    const exists = selectedItems.some(i => i.itemId === selected.id);
    if (exists) return;

    setSelectedItems(prev => [...prev, { itemId: selected.id, quantity: 1 }]);
    setSelectedItemName('');
  };

  const updateQuantity = (itemId: number, delta: number) => {
    const inventoryItem = items?.find(item => item.itemId === itemId);
    if (!inventoryItem) return;

    setSelectedItems(prev =>
      prev.map(item => {
        if (item.itemId === itemId) {
          const newQuantity = item.quantity + delta;
          if (delta > 0 && newQuantity > inventoryItem.availableQuantity) {
            toast.error(`No puede extraer más de ${inventoryItem.availableQuantity} ${inventoryItem.availableQuantity === 1 ? "unidad" : "unidades"} disponibles`);
            return item;
          }
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      })
    );
  };

  const removeItem = (itemId: number) => {
    setSelectedItems(prev => prev.filter(item => item.itemId !== itemId));
  };

  const handleSubmit = () => {
    formSubmit((values) => {
      const payload = {
        volunteerId: Number(values.volunteerId),
        items: selectedItems,
      };

      mutate(payload, {
        onSuccess: () => {
          navigate("/inventory/list");
        },
      });
    })();
  };

  const filteredItemOptions = itemOptions.filter(
    (item) => !selectedItems.some((selected) => selected.itemId === item.id)
  );

  if (isLoadingForm) {
    return <Loader message="Cargando datos para el registro de extracción..." />;
  }  

  return (
    <form>
      <section className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark mb-6">
        <div className="-mx-6 -mt-2">
          <BackLink
            text="Volver al listado de elementos"
            link="/inventory/list"
            className="pt-0"
          />
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white mt-4">
          Registro de extracción
        </h2>

        <div className="flex-1 mb-4">
          <Controller
            name="volunteerId"
            control={control}
            render={({ field }) => (
              <FilterDatalist
                {...field}
                label="Seleccionar un voluntario"
                options={volunteerOptions}
                onChange={(value) => {
                  const selected = volunteerOptions.find(v => v.name === value);
                  field.onChange(selected ? String(selected.id) : "");
                  setSelectedVolunteerName(value);
                }}
                value={selectedVolunteerName}
                disabled={isPending}
              />
            )}
          />
          
          {errors.volunteerId && (
            <ErrorFormMessage>{errors.volunteerId.message}</ErrorFormMessage>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mt-4">
          <div className="flex-1">
            <FilterDatalist
              name="item"
              label="Seleccionar un elemento"
              options={filteredItemOptions}
              onChange={(value) => setSelectedItemName(value)}
              value={selectedItemName}
              disabled={isPending}
            />
          </div>
          <div className="flex-none">
            <Button
              label="Agregar"
              onClick={handleAddItem}
              variant="primary"
              disabled={!selectedItemName}
            />
          </div>
        </div>

        <div className="mt-4 border border-stroke dark:border-strokedark rounded-md overflow-x-auto">
          <table className="w-full table-auto text-center border-collapse border border-stroke dark:border-strokedark">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4 border border-stroke dark:border-strokedark">
                <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                  Elemento
                </th>
                <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                  Cantidad
                </th>
                <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                  Disponible
                </th>
                <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-sm text-gray-500">
                    Aún no hay elementos seleccionados.
                  </td>
                </tr>
              ) : (
                selectedItems.map(item => {
                  const itemName = itemOptions.find(i => i.id === item.itemId)?.name ?? "—";
                  const availableQuantity = items?.find(i => i.itemId === item.itemId)?.availableQuantity ?? 0;
                  return (
                    <tr key={item.itemId} className="border border-stroke dark:border-strokedark">
                      <td className="py-2 px-4 border border-stroke dark:border-strokedark">{itemName}</td>
                      <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            type="button" 
                            onClick={() => updateQuantity(item.itemId, +1)}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                            disabled={item.quantity >= availableQuantity}
                          >
                            +
                          </button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <button 
                            type="button" 
                            onClick={() => updateQuantity(item.itemId, -1)}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                          >
                            -
                          </button>
                        </div>
                      </td>
                      <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                        {availableQuantity}
                      </td>
                      <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                        <button 
                          type="button" 
                          onClick={() => removeItem(item.itemId)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {errors.items && (
          <ErrorFormMessage>{errors.items.message}</ErrorFormMessage>
        )}
      </section>

      <section>
        <ButtonGroup
          buttons={[
            {
              type: 'button',
              label: 'Registrar extracción',
              onClick: handleSubmit,
              variant: 'primary',
              isLoading: isPending,
            },
            { type: 'button', label: 'Cancelar', onClick: () => navigate("/inventory/list"), disabled: isPending, variant: 'secondary' },
          ]}
        />
      </section>
    </form>
  );
}
