import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { extractItem } from "@/api/InventoryAPI";

export function useExtractItem() {
  return useMutation({
    mutationFn: extractItem,
    onError: () => toast.error("Error al extraer el elemento"),
    onSuccess: () => toast.success("Elemento extraído correctamente"),
  });
}
