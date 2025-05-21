import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { extractBatchItems } from "@/api/InventoryAPI";
import { InventoryBatchMovementForm } from "@/types/invetory.schema";

export function useRegisterBatchWithdrawal() {
  return useMutation<void, Error, InventoryBatchMovementForm>({
    mutationFn: extractBatchItems,
    onError: () =>
      toast.error("Ocurrió un error al registrar la extracción"),
    onSuccess: () =>
      toast.success("Extracción registrada correctamente"),
  });
}