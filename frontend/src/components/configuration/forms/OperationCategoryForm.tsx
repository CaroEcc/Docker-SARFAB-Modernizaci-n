import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateOperationCategoryForm } from "@/types/operationAndType.schema";
import FormInput from "@/components/common/FormInput/FormInput";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import ErrorFormMessage from "@/components/common/ErrorFormMessage/ErrorFormMessage";

interface OperationCategoryFormProps {
  form: UseFormReturn<CreateOperationCategoryForm>;
  onSubmit: (data: CreateOperationCategoryForm) => Promise<void>;
  isLoading: boolean;
  onClose: () => void;
  categoryId?: number;
}

export function OperationCategoryForm({
  form,
  onSubmit,
  isLoading,
  onClose,
  categoryId,
}: OperationCategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (data: CreateOperationCategoryForm) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    await onSubmit(data);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-8 space-y-4">
      <fieldset disabled={isLoading}>
      <div>
        <FormInput
          label="Nombre de la categoría"
          name="name"
          type="text"
          register={register}
          placeholder="Ingresa el nombre de la categoría"
        />
        {errors.name && (
          <ErrorFormMessage>{errors.name.message}</ErrorFormMessage>
        )}
        </div>
      </fieldset>

      <div className="pt-6">
        <ButtonGroup
          buttons={[
            {
              type: "button",
              label: categoryId ? "Guardar" : "Registrar",
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
