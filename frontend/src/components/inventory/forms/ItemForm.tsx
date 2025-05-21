import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateItemForm } from "@/types/invetory.schema";
import FormInput from "@/components/common/FormInput/FormInput";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import ErrorFormMessage from "@/components/common/ErrorFormMessage/ErrorFormMessage";

interface ItemFormProps {
  form: UseFormReturn<CreateItemForm>;
  onSubmit: (data: CreateItemForm) => Promise<void>;
  isLoading: boolean;
  onClose: () => void;
  itemId?: number;
  assignedQuantity?: number;
}

export function ItemForm({
  form,
  onSubmit,
  isLoading,
  onClose,
  itemId,
  assignedQuantity,
}: ItemFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shouldShowWarning = Boolean(itemId) && typeof assignedQuantity === 'number' && assignedQuantity > 0;

  const handleFormSubmit = async (data: CreateItemForm) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getErrorMessage = (error: any) => {
    if (!error) return null;
    
    if (error.type === "invalid_type") {
      return "Debe ingresar un número válido";
    }
    
    if (error.message) {
      return error.message;
    }
    
    switch (error.type) {
      case "min":
        return `El valor debe ser al menos ${error.ref?.value || 1}`;
      case "max":
        return `El valor debe ser como máximo ${error.ref?.value || 1000}`;
      default:
        return "Valor inválido";
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-0 sm:p-8 space-y-4">
      <div className="space-y-0">
        <fieldset disabled={isLoading || isSubmitting}>
        <FormInput
          label="Nombre del elemento"
          name="name"
          type="text"
          register={register}
          placeholder="Ingresa el nombre del elemento"
        />
        {errors.name && (
          <div className="-mt-2">
            <ErrorFormMessage>{getErrorMessage(errors.name)}</ErrorFormMessage>
          </div>
        )}
        </fieldset>
      </div>

      <div className="space-y-0 mt-4">
        <div className="w-full">
          <label htmlFor="quantity" className="mb-2.5 block text-black dark:text-white">
            Cantidad del elemento
          </label>
          <div className="relative">
            <input
              id="quantity"
              type="number"
              disabled={isLoading || isSubmitting}
              placeholder="Cantidad disponible"
              min={1}
              {...register("quantity", { 
                valueAsNumber: true,  
                required: "Debe ingresar la cantidad",
                min: { 
                  value: 1, 
                  message: "La cantidad debe ser al menos 1" 
                },
                setValueAs: (value) => {
                  const parsedValue = Number(value);
                  return isNaN(parsedValue) ? undefined : parsedValue;
                }
              })}
              className="w-full rounded border-[1.5px] border-stroke py-3 px-5 pr-10 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default :bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>
        
        {errors.quantity && (
          <div className="-mt-2">
            <ErrorFormMessage>
              {getErrorMessage(errors.quantity)}
            </ErrorFormMessage>
          </div>
        )}
        
        {shouldShowWarning && (
          <div className="text-sm text-amber-600 dark:text-amber-400 mt-2 pt-2">
            <span className="font-bold">Importante:</span> Hay {assignedQuantity} {assignedQuantity === 1 ? "unidad" : "unidades"} asignadas. 
            La cantidad no puede ser menor a este valor.
          </div>
        )}
      </div>

      <div className="pt-6">
        <ButtonGroup
          buttons={[
            {
              type: "button",
              label: itemId ? "Guardar" : "Registrar",
              onClick: handleSubmit(handleFormSubmit),
              variant: "primary",
              isLoading: isLoading || isSubmitting,
              disabled: isLoading || isSubmitting,
            },
            {
              type: "button",
              label: "Cancelar",
              onClick: onClose,
              variant: "secondary",
              disabled: isLoading || isSubmitting,
            },
          ]}
        />
      </div>
    </form>
  );
}
