import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateOperationType } from "@/hooks/configuration/mutations/useUpdateOperationType";
import Modal from "@/components/common/Modal/Modal";
import FormInput from "@/components/common/FormInput/FormInput";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import ErrorFormMessage from "@/components/common/ErrorFormMessage/ErrorFormMessage";

const editTypeSchema = z.object({
  name: z.string().min(1, "El nombre del tipo de operación es obligatorio").max(100, "El nombre del tipo de operación debe tener máximo 100 caracteres"),
});

type FormValues = z.infer<typeof editTypeSchema>;

interface EditOperationTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  typeId?: number;
  typeName?: string;
}

export function EditOperationTypeModal({
  isOpen,
  onClose,
  typeId,
  typeName,
}: EditOperationTypeModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const updateType = useUpdateOperationType();

  const form = useForm<FormValues>({
    resolver: zodResolver(editTypeSchema),
    defaultValues: { name: typeName || "" },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    if (isOpen && typeName) {
      reset({ name: typeName });
    }
  }, [isOpen, typeName, reset]);

  const handleFormSubmit = async (data: FormValues) => {
    if (!typeId) return;

    try {
      setIsLoading(true);
      await updateType.mutateAsync({
        id: typeId,
        formData: data,
      });
      onClose();
    } catch (error) {
      console.error("Error al actualizar el tipo de operación:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      key={typeId}
      title="Editar tipo de operación"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4">
        <fieldset disabled={isLoading}>
        <FormInput
          label="Nombre del tipo de operación"
          name="name"
          register={register}
          placeholder="Ingrese el nombre del tipo de operación"
        />
        {errors.name && (
          <ErrorFormMessage>{errors.name.message}</ErrorFormMessage>
          )}
        </fieldset>

        <div className="pt-6">
          <ButtonGroup
            buttons={[
              {
                type: "button",
                label: "Cancelar",
                onClick: onClose,
                variant: "secondary",
                disabled: isLoading,
              },
              {
                type: "button",
                label: "Actualizar",
                onClick: handleSubmit(handleFormSubmit),
                variant: "primary",
                isLoading: isLoading,
                disabled: isLoading,
              },
            ]}
          />
        </div>
      </form>
    </Modal>
  );
}
