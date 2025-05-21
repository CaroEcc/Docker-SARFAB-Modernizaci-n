import { updatePersonStatusOperation } from "@/api/OperationAPI";
import { useMutation } from "@tanstack/react-query";
import { UpdatePersonStatusForm } from '@/types/operation.schema';

export function useUpdateStatusPersonOperation() {
  return useMutation({
    mutationFn: async (formData: UpdatePersonStatusForm) => {
      return await updatePersonStatusOperation(formData);
    }
  });
}
