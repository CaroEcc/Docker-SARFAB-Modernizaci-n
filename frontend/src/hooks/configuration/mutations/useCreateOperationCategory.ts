import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOperationCategory } from "@/api/OperationAndTypesAPI";

export function useCreateOperationCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createOperationCategory,
    onError: () => toast.error("Ocurrió un error al registrar la categoría de operación"),
    onSuccess: () => {
      toast.success("Categoría de operación registrada correctamente");
      queryClient.invalidateQueries({ queryKey: ["categoriesWithTypes"] });
    },
  });
}
