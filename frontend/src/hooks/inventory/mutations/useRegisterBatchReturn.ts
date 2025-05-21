import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { returnBatchItems } from "@/api/InventoryAPI";
import { InventoryBatchMovementForm } from "@/types/invetory.schema";

export function useRegisterBatchReturn() {
  return useMutation<void, Error, InventoryBatchMovementForm>({
    mutationFn: returnBatchItems,
    onError: () =>
      toast.error("Ocurrió un error al registrar la devolución"),
    onSuccess: () =>
      toast.success("Devolución registrada correctamente"),
  });
}
