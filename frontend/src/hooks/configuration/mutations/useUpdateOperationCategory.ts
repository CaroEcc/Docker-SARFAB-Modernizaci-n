import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateOperationCategory } from "@/api/OperationAndTypesAPI";
import { UpdateOperationCategoryForm } from "@/types/operationAndType.schema";

interface UpdateOperationCategoryParams {
  id: number;
  formData: UpdateOperationCategoryForm;
}

export function useUpdateOperationCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, formData }: UpdateOperationCategoryParams) => updateOperationCategory(id, formData),
    onError: () => toast.error("Ocurrió un error al actualizar la categoría de operación"),
    onSuccess: () => {
      toast.success("Categoría de operación actualizada correctamente");
      queryClient.invalidateQueries({ queryKey: ["categoriesWithTypes"] });
    },
  });
}
