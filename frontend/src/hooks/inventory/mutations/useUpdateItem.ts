
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateItem } from "@/api/InventoryAPI";
import { UpdateItemForm } from "@/types/invetory.schema";

interface UpdateItemParams {
  id: number;
  formData: UpdateItemForm;
}

export function useUpdateItem() {
  return useMutation({
    mutationFn: ({ id, formData }: UpdateItemParams) => updateItem(id, formData),
    onError: () => toast.error("Ocurrió un error al actualizar el elemento")
  });
}
