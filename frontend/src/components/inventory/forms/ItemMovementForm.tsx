import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { InventoryMovementForm, VolunteerPendingReturn } from "@/types/invetory.schema";
import FormInput from "@/components/common/FormInput/FormInput";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import ErrorFormMessage from "@/components/common/ErrorFormMessage/ErrorFormMessage";
import FilterDatalist from "@/components/common/FilterDatalist/FilterDatalist";
import { VolunteerWithRank } from "@/types/operationContext.schema";
import Spinner from "@/components/common/Spinner/Spinner";

interface ItemMovementFormProps {
  form: UseFormReturn<InventoryMovementForm>;
  onSubmit: (data: InventoryMovementForm) => Promise<void>;
  isLoading: boolean;
  onClose: () => void;
  itemId: number;
  isReturn: boolean;
  availableQuantity: number;
  owedQuantity?: number;
  volunteers: (VolunteerPendingReturn | VolunteerWithRank)[];
}

export function ItemMovementForm({
  form,
  onSubmit,
  isLoading,
  onClose,
  isReturn,
  availableQuantity: _availableQuantity,
  owedQuantity: _owedQuantity,
  volunteers,
}: ItemMovementFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    setValue,
    watch,
    trigger,
  } = form;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formVolunteerId = watch("volunteerId");
  const volunteerId = formVolunteerId === 0 ? undefined : formVolunteerId;

  const selected = volunteers.find((v) => v.volunteerId === volunteerId);
  const displayName = selected
    ? isReturn
      ? (selected as VolunteerPendingReturn).volunteerWithGrade
      : `${(selected as VolunteerWithRank).abbreviation} - ${(selected as VolunteerWithRank).lastName} ${(selected as VolunteerWithRank).firstName}`
    : "";

  const handleFormSubmit = async (data: InventoryMovementForm) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    await onSubmit(data);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-0 sm:p-8 space-y-6">
      <div className="space-y-1">
        <FilterDatalist
          name="volunteerId"
          label="Voluntario"
          options={volunteers.map((v) => ({
            id: v.volunteerId,
            name: isReturn
              ? (v as VolunteerPendingReturn).volunteerWithGrade
              : `${(v as VolunteerWithRank).abbreviation} - ${(v as VolunteerWithRank).lastName} ${(v as VolunteerWithRank).firstName}`,
          }))}
          value={displayName}
          disabled={isLoading}
          onChange={(value) => {
            const selected = volunteers.find((v) => {
              const name = isReturn
                ? (v as VolunteerPendingReturn).volunteerWithGrade
                : `${(v as VolunteerWithRank).abbreviation} - ${(v as VolunteerWithRank).lastName} ${(v as VolunteerWithRank).firstName}`;
              return name === value;
            });
            if (selected) {
              setValue("volunteerId", selected.volunteerId);
            } else {
              setValue("volunteerId", 0);
            }
            trigger("volunteerId");
          }}
        />
        {errors.volunteerId && (
  <ErrorFormMessage>Debe seleccionar un voluntario válido</ErrorFormMessage>
)}
      </div>

      <div className="space-y-1">
        <FormInput
          label="Cantidad"
          name="quantity"
          type="number"
          register={register}
          placeholder="Cantidad"
          readonly={isLoading}
        />
        {isSubmitted && errors.quantity && (
          <ErrorFormMessage>{errors.quantity.message}</ErrorFormMessage>
        )}

        {!isReturn && (
          <div className="text-sm text-red-600 dark:text-red-400 mt-2 pt-2">
            <span className="font-bold">Importante:</span> Cantidad disponible: {_availableQuantity} {(_availableQuantity === 1) ? "unidad" : "unidades"}, no puede ingresar una cantidad mayor.
          </div>
        )}

        {isReturn && volunteerId && (
          <div className="text-sm text-red-600 dark:text-red-400 mt-2 pt-2">
            <span className="font-bold">Importante:</span> El voluntario debe{" "}
            {_owedQuantity === undefined ? (
              <Spinner size={16} />
            ) : (
              `${_owedQuantity} ${_owedQuantity === 1 ? "unidad" : "unidades"}`
            )}
            {" "}
            de este elemento, no puede ingresar una cantidad mayor.
          </div>
        )}
      </div>

      <div className="pt-4">
        <ButtonGroup
          buttons={[
            {
              type: "button",
              label: isReturn ? "Registrar devolución" : "Registrar extracción",
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
