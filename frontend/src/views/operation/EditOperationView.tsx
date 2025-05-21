import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOperationForm } from '@/hooks/operation/forms/useOperationForm';
import { useGetOperationDetail } from '@/hooks/operation/querys/useGetOperationDetail';
import { useUpdateOperation } from '@/hooks/operation/mutations/useUpdateOperation';
import EditOperationForm from '@/components/operation/EditOperationForm';
import EditOperationPersonnelForm from '@/components/operation/EditOperationPersonnelForm';
import ButtonGroup from '@/components/common/ButtonGroup/ButtonGroup';
import { UpdateOperationForm } from '@/types/operation.schema';
import { useQueryClient } from '@tanstack/react-query';
import { useBreadcrumb } from '@/hooks/components/useBreadcrumb';
import Loader from '@/components/common/Loader';

export default function EditOperationView() {
  useBreadcrumb([
    { label: 'Operaciones', path: '/operation/list' },
    { label: 'Editar operación' },
  ]);
  const queryClient = useQueryClient();
  const { operationId } = useParams<{ operationId: string }>();
  const operationIdNumber = Number(operationId);

  const { data: operation, isLoading: isLoadingOperation } =
    useGetOperationDetail(operationIdNumber);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
    operationContext,
    volunteers,
    military,
  } = useOperationForm({
    operationTypeId: 0,
    municipalityId: 0,
    address: '',
    departureDate: '',
    arrivalDate: '',
    requester: {
      requesterName: '',
      requesterPhone: '',
      requesterMobilePhone: '',
    },
    responsible: { personId: 0, role: 'Responsable' },
    personnel: [],
  });

  const { mutate, isPending: isUpdating } = useUpdateOperation();

  useEffect(() => {
    if (operation) {
      reset({
        operationTypeId: operation.operationTypeId,
        municipalityId: operation.municipalityId,
        address: operation.address,
        departureDate: operation.departureDate.split('T')[0],
        arrivalDate: operation.arrivalDate.split('T')[0],
        requester: {
          requesterName: operation.requesterName,
          requesterPhone: operation.requesterPhone || '',
          requesterMobilePhone: operation.requesterMobile || '',
        },
        responsible: {
          personId: operation.responsible.personId,
          role: 'Responsable',
        },
        personnel: operation.personnel.map((p) => ({
          personId: p.personId,
          role: '',
        })),
      });
    }
  }, [operation, reset]);
  const navigate = useNavigate();

  const onSubmit = (formData: UpdateOperationForm) => {
    mutate(
      { id: operationIdNumber, formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['operationDetail', operationIdNumber],
          });
          queryClient.invalidateQueries({ queryKey: ["operationAbsence", operationIdNumber] });
          navigate('/operation/list');
        },
        onError: (error) => console.error('❌ Error en mutate', error),
      },
    );
  };

  return (
    <div className="container mx-auto p-4">
      {isLoadingOperation || !operationContext ? (
        <Loader message="Cargando datos para editar la operación" />
      ) : (
        <form className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
            <fieldset disabled={isUpdating}>
            <EditOperationForm
              operation={operation}
              operationContext={operationContext}
              register={register}
              control={control}
              errors={errors}
                />
            </fieldset>
          </div>
          <div className="flex-1 flex flex-col">
            <fieldset disabled={isUpdating}>
              <EditOperationPersonnelForm
              operation={operation}
              volunteers={volunteers}
              military={military}
              register={register}
              errors={errors}
              setValue={setValue}
            />
            </fieldset>
            <div className="mt-4 flex justify-end">
              <ButtonGroup
                buttons={[
                  {
                    type: 'button',
                    label: isUpdating ? 'Guardando...' : 'Editar operación',
                    onClick: () => handleSubmit(onSubmit)(),
                    variant: 'primary',
                    disabled: isSubmitting || isUpdating,
                  },
                  { type: 'button', label: 'Cancelar', onClick: () => navigate("/operation/list"), variant: 'secondary', disabled: isSubmitting || isUpdating },
                ]}
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
