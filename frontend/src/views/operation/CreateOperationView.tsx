import { useBreadcrumb } from '@/hooks/components/useBreadcrumb';
import { useOperationForm } from '@/hooks/operation/forms/useOperationForm';
import { useCreateOperation } from '@/hooks/operation/mutations/useCreateOperation';
import { CreateOperationForm } from '@/types/operation.schema';
import { useState } from 'react';
import OperationDetailsForm from '@/components/operation/OperationDetailsForm';
import OperationPersonnelForm from '@/components/operation/OperationPersonnelForm';
import ButtonGroup from '@/components/common/ButtonGroup/ButtonGroup';
import Loader from '@/components/common/Loader';
import { useNavigate } from 'react-router-dom';

export default function CreateOperationView() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  useBreadcrumb([
    { label: 'Operaciones', path: '/operation/list' },
    { label: 'Registrar nueva operación' },
  ]);

  const formatDateToYYYYMMDD = (date: string | Date) => {
    if (typeof date === 'string') return date;
    return date.toISOString().split('T')[0].replace(/-/g, '/');
  };

  const initialValues: CreateOperationForm = {
    address: '',
    departureDate: '',
    arrivalDate: '',
    operationTypeId: 0,
    municipalityId: 0,
    requester: {
      requesterName: '',
      requesterPhone: '',
      requesterMobilePhone: '',
    },
    responsible: {
      personId: 0,
      role: '',
    },
    personnel: [],
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    operationContext,
    volunteers,
    military,
    isLoading,
  } = useOperationForm(initialValues);

  const mutation = useCreateOperation();

  const handleForm = async (formData: CreateOperationForm) => {
    setIsSubmitting(true);
    try {
      const formattedData: CreateOperationForm = {
        ...formData,
        departureDate: formatDateToYYYYMMDD(formData.departureDate),
        arrivalDate: formatDateToYYYYMMDD(formData.arrivalDate),
      };

      await mutation.mutateAsync(formattedData);
    } catch (error) {
      console.error('Error al registrar la operación:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return isLoading ? (
    <Loader message="Cargando datos previos para registrar la operación" />
  ) : (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit(handleForm)}
        className="flex flex-col md:flex-row gap-6"
      >
        <div className="flex-1 w-full md:w-1/2">
          <fieldset disabled={isSubmitting} className="w-full h-full">
            <OperationDetailsForm
              register={register}
              control={control}
              errors={errors}
              operationContext={operationContext}
            />
          </fieldset>
        </div>

        <div className="flex-1 flex flex-col w-full md:w-1/2">
          <fieldset disabled={isSubmitting} className="w-full">
            <OperationPersonnelForm
              errors={errors}
              setValue={setValue}
              military={military}
              volunteers={volunteers}
            />
          </fieldset>
          <div className="mt-4 flex justify-end">
            <ButtonGroup
              buttons={[
                {
                  type: 'button',
                  label: 'Registrar operación',
                  onClick: handleSubmit(handleForm),
                  variant: 'primary',
                  disabled: isSubmitting,
                  isLoading: isSubmitting,
                },
                { type: 'button', label: 'Cancelar', onClick: () => navigate("/operation/list"), variant: 'secondary', disabled: isSubmitting },
              ]}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
