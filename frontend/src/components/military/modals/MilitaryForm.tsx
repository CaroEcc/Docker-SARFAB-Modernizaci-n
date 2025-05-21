import { useState } from 'react';
import { MilitaryFormProps } from '@/components/military/types/MilitaryFormProps';
import FormInput from '@/components/common/FormInput/FormInput';
import FormSelectControlled from '@/components/common/FormSelect/FormSelectControlled';
import ButtonGroup from '@/components/common/ButtonGroup/ButtonGroup';
import { CreateMilitaryForm } from '@/types/index';
import ErrorFormMessage from '@/components/common/ErrorFormMessage/ErrorFormMessage';

export function MilitaryForm({
  form,
  onSubmit,
  rankOptions,
  isLoading,
  onClose,
  militaryId,
}: MilitaryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (data: CreateMilitaryForm) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    await onSubmit(data);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-8 space-y-4">
      <fieldset disabled={isLoading || isSubmitting}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5">
        <div className="flex flex-col">
          <FormInput
            label="Nombres"
            name="firstName"
            type="text"
            register={register}
            placeholder="Ingrese los nombres"
            required
          />
          {errors.firstName && (
            <ErrorFormMessage>{errors.firstName.message}</ErrorFormMessage>
          )}
        </div>

        <div className="flex flex-col">
          <FormInput
            label="Apellidos"
            name="lastName"
            type="text"
            placeholder="Ingrese los apellidos"
            register={register}
            errors={errors}
            required
          />
          {errors.lastName && (
            <ErrorFormMessage>{errors.lastName.message}</ErrorFormMessage>
          )}
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <FormInput
          label="Teléfono"
          name="mobilePhone"
          type="text"
          placeholder="Ingrese el teléfono"
          register={register}
          errors={errors}
          required
        />
        {errors.mobilePhone && (
          <ErrorFormMessage>{errors.mobilePhone.message}</ErrorFormMessage>
        )}
      </div>
      <div className="flex flex-col mt-4">
        <FormSelectControlled
          label="Grado"
          name="militaryRankId"
          control={control}
          options={rankOptions}
          required
          defaultValue={form.watch("militaryRankId")}
        />
        {errors.militaryRankId && (
          <ErrorFormMessage>{errors.militaryRankId.message}</ErrorFormMessage>
        )}
        </div>
      </fieldset>
      <div className="pt-6">
        <ButtonGroup
          buttons={[
            {
              type: 'button',
              label: militaryId ? 'Actualizar' : 'Registrar',
              onClick: handleSubmit(handleFormSubmit),
              variant: 'primary',
              isLoading: isLoading || isSubmitting,
              disabled: isLoading || isSubmitting,
            },
            {
              type: 'button',
              label: 'Cancelar',
              onClick: onClose,
              variant: 'secondary',
              disabled: isLoading || isSubmitting,
            },
          ]}
        />
      </div>
    </form>
  );
}
