import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { returnItem } from "@/api/InventoryAPI";

export function useReturnItem() {
  return useMutation({
    mutationFn: returnItem,
    onError: () => toast.error("Error al devolver el elemento"),
    onSuccess: () => toast.success("Elemento devuelto correctamente"),
  });
}
