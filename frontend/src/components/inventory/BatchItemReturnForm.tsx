import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BackLink from "../common/BackLink/BackLink";
import FilterDatalist from "../common/FilterDatalist/FilterDatalist";
import ButtonGroup from "../common/ButtonGroup/ButtonGroup";
import { useVolunteersWithAnyPendingReturns } from "@/hooks/inventory/querys/useVolunteersWithAnyPendingReturns";
import { useItemsOwedByVolunteer } from "@/hooks/inventory/querys/useItemsOwedByVolunteer";
import { useRegisterBatchReturn } from "@/hooks/inventory/mutations/useRegisterBatchReturn";
import { Item, BatchItemReturnSchema } from "@/types/invetory.schema";
import { useNavigate } from "react-router-dom";
import ErrorFormMessage from "../common/ErrorFormMessage/ErrorFormMessage";
import { z } from "zod";
import Loader from "../common/Loader";

type BatchItemReturnSchemaType = z.infer<typeof BatchItemReturnSchema>;

export default function BatchItemReturnForm() {
  const [returnQuantities, setReturnQuantities] = useState<Record<number, number>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BatchItemReturnSchemaType>({
    resolver: zodResolver(BatchItemReturnSchema),
  });

  const volunteerId = watch("volunteerId");

  const { data: volunteers = [], isLoading: isLoadingVolunteers } = useVolunteersWithAnyPendingReturns();
  const { data: owedItems = [], isLoading } = useItemsOwedByVolunteer(volunteerId ?? 0);
  const { mutate: registerReturn, isPending } = useRegisterBatchReturn();
  const navigate = useNavigate();

  useEffect(() => {
    if (owedItems.length > 0) {
      const initialQuantities: Record<number, number> = {};
      owedItems.forEach((item) => {
        initialQuantities[item.itemId] = 0;
      });
      setReturnQuantities(initialQuantities);
    }
  }, [owedItems]);

  const handleChangeQuantity = (itemId: number, change: number, max: number) => {
    setReturnQuantities((prev) => {
      const current = prev[itemId] || 0;
      const updated = Math.max(0, Math.min(current + change, max));
      return { ...prev, [itemId]: updated };
    });
  };

  const onSubmit = (data: BatchItemReturnSchemaType) => {
    const itemsToReturn = Object.entries(returnQuantities)
      .filter(([, quantity]) => quantity > 0)
      .map(([itemId, quantity]) => ({
        itemId: Number(itemId),
        quantity,
      }));

    if (itemsToReturn.length === 0) {
      setSubmitError("Debes seleccionar al menos un elemento para devolver");
      return;
    }

    setSubmitError(null);

    registerReturn(
      {
        volunteerId: data.volunteerId,
        items: itemsToReturn,
      },
      {
        onSuccess: () => {
          navigate("/inventory/list");
        },
      }
    );
  };

  if (isLoadingVolunteers) {
    return <Loader message="Cargando datos para el registro de devolución..." />;
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
          Registro de devolución
        </h2>

        <div className="flex-1 mb-4">
          <Controller
            name="volunteerId"
            control={control}
            render={({ field }) => (
              <FilterDatalist
                {...field}
                label="Seleccionar un voluntario"
                options={volunteers.map((v) => ({
                  id: v.volunteerId,
                  name: v.volunteerWithGrade,
                }))}
                onChange={(value) => {
                  const selected = volunteers.find((v) => v.volunteerWithGrade === value);
                  field.onChange(selected ? String(selected.volunteerId) : "");
                }}
                value={
                  volunteers.find((v) => v.volunteerId === Number(field.value))?.volunteerWithGrade || ""
                }
                disabled={isPending}
              />
            )}
          />

          {errors.volunteerId && (
            <ErrorFormMessage>{errors.volunteerId.message}</ErrorFormMessage>
          )}
        </div>

        <div className="mt-4 border border-stroke dark:border-strokedark rounded-md overflow-x-auto">
          <table className="w-full table-auto text-center border-collapse border border-stroke dark:border-strokedark">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4 border border-stroke dark:border-strokedark">
                <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                  Nombre del elemento
                </th>
                <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                  Cantidad
                </th>
                <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                  Monto pendiente
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="py-6 text-center">
                    Cargando elementos...
                  </td>
                </tr>
              ) : owedItems.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-gray-500">
                    No hay elementos pendientes para este voluntario.
                  </td>
                </tr>
              ) : (
                owedItems.map((item: Item) => (
                  <tr key={item.itemId} className="border border-stroke dark:border-strokedark">
                    <td className="border border-stroke dark:border-strokedark px-4 py-2">{item.name}</td>
                    <td className="border border-stroke dark:border-strokedark px-4 py-2">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleChangeQuantity(item.itemId, 1, item.quantity)}
                          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                        >
                          +
                        </button>
                        <span className="w-6 text-center">{returnQuantities[item.itemId] ?? 0}</span>
                        <button
                          type="button"
                          onClick={() => handleChangeQuantity(item.itemId, -1, item.quantity)}
                          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                        >
                          −
                        </button>
                      </div>
                    </td>
                    <td className="border border-stroke dark:border-strokedark px-4 py-2 text-center">
                      Debe: {item.quantity - (returnQuantities[item.itemId] ?? 0)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {submitError && (
            <div className="mt-2">
              <ErrorFormMessage>{submitError}</ErrorFormMessage>
            </div>
          )}
        </div>
      </section>

      <section>
        <ButtonGroup
          buttons={[
            {
              type: "button",
              label: "Registrar devolución",
              onClick: handleSubmit(onSubmit),
              variant: "primary",
              isLoading: isPending,
            },
            {
              type: "button",
              label: "Cancelar",
              onClick: () => navigate("/inventory/list"),
              disabled: isPending,
              variant: "secondary",
            },
          ]}
        />
      </section>
    </form>
  );
}
