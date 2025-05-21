import { updateOperationStatus } from '@/api/OperationAPI';
import { UpdateOperationStatusForm } from '@/types/operation.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
export function useOperationStatusMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ formData, id }: { formData: UpdateOperationStatusForm; id: number }) => {
      return updateOperationStatus(formData, id);
    },
    
    onError: () => toast.error("Ocurrió un error al actualizar el estado de la operación"),
    onSuccess: () => {
      toast.success("Operación finalizada correctamente");
      queryClient.invalidateQueries({ queryKey: ["operation"] });
    },
  });
}