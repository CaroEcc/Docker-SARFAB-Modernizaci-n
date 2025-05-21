import { useMutation } from "@tanstack/react-query";
import { updateMilitary } from "@/api/MilitaryAPI";
import { toast } from "react-toastify";

export function useUpdateMilitary() {
  return useMutation({
    mutationFn: updateMilitary,
    onError: () => toast.error("Ocurrió un error al actualizar el militar"),
    onSuccess: () => {
      toast.success("Militar actualizado correctamente");
    },
  });
}
