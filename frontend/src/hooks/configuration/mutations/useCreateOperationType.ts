import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOperationType } from "@/api/OperationAndTypesAPI";
import { CreateOperationTypeForm } from "@/types/operationAndType.schema";
import { toast } from "react-toastify";

export function useCreateOperationType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOperationTypeForm) => createOperationType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoriesWithTypes"] });
      toast.success("Tipo de operación creado exitosamente");
    },
    onError: () => {
      toast.error("Error al crear el tipo de operación");
    }
  });
}
