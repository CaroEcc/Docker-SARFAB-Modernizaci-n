import { UseFormReturn } from "react-hook-form";
import FormInput from "@/components/common/FormInput/FormInput";
import ErrorFormMessage from "@/components/common/ErrorFormMessage/ErrorFormMessage";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import FilterDatalist from "@/components/common/FilterDatalist/FilterDatalist";
import { FilterOption } from "@/components/common/FilterDatalist/FilterDatalist.type";

interface FormValues {
  name: string;
  operationCategoryId: number;
}

interface OperationTypeFormProps {
  form: UseFormReturn<FormValues>;
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
  onClose: () => void;
  typeId?: number;
  categoryOptions: FilterOption[];
  selectedCategoryName: string;
  handleCategoryChange: (value: string) => void;
  editNameOnly?: boolean;
}

export function OperationTypeForm({
  form,
  onSubmit,
  isLoading,
  onClose,
  typeId,
  categoryOptions,
  selectedCategoryName,
  handleCategoryChange,
  editNameOnly = false
}: OperationTypeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
      <fieldset disabled={isLoading}>
      <div>
        <FormInput
          label="Nombre del tipo de operación"
          name="name"
          register={register}
          placeholder="Ingrese el nombre del tipo de operación"
        />
        {errors.name && (
          <ErrorFormMessage>{errors.name.message as string}</ErrorFormMessage>
        )}
        </div>
        </fieldset>

      {!editNameOnly && (
        <div className="mt-4">
          <FilterDatalist
            name="operationCategory"
            label="Categoría de operación"
            options={categoryOptions}
            value={selectedCategoryName}
            onChange={handleCategoryChange}
            showLabel={true}
            disabled={isLoading}
          />
          {errors.operationCategoryId && (
            <ErrorFormMessage>
              {errors.operationCategoryId.message as string}
            </ErrorFormMessage>
          )}
        </div>
      )}

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
              label: typeId ? "Actualizar" : "Registrar",
              onClick: handleSubmit(onSubmit),
              variant: "primary",
              isLoading: isLoading,
            },
          ]}
        />
      </div>
    </form>
  );
}
