import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOperationType } from "@/api/OperationAndTypesAPI";
import { UpdateOperationTypeForm } from "@/types/operationAndType.schema";
import { toast } from "react-toastify";

interface UpdateOperationTypeParams {
  id: number;
  formData: UpdateOperationTypeForm;
}

export function useUpdateOperationType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: UpdateOperationTypeParams) => 
      updateOperationType(id, formData),
    onSuccess: () => {
      toast.success("Tipo de operación actualizado correctamente");
      queryClient.invalidateQueries({ queryKey: ["categoriesWithTypes"] });
    },
    onError: () => toast.error("Ocurrió un error al actualizar el tipo de operación"),
  });
}
