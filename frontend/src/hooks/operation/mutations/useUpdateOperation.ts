import { useMutation } from "@tanstack/react-query";
import { updateOperation } from "@/api/OperationAPI";
import { toast } from "react-toastify";
import { UpdateOperationForm } from "@/types/operation.schema";

export function useUpdateOperation() {
  return useMutation({
    mutationFn: async ({ id, formData }: { id: number; formData: UpdateOperationForm }) => {
      return await updateOperation(formData, id);
    },
    onSuccess: () => toast.success("Operación actualizada correctamente"),
    onError: () => toast.error("Ocurrió un error al actualizar la operación"),
  });
}
