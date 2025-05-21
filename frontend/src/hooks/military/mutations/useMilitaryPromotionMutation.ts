import { useMutation, useQueryClient } from "@tanstack/react-query";
import { promoteMilitary } from "@/api/MilitaryAPI";
import toast from "react-hot-toast";

export function useMilitaryPromotionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: promoteMilitary,
    onSuccess: (data) => {
      toast.success(data.message || "Ascenso exitoso");
      queryClient.invalidateQueries({ queryKey: ["military"] }); // Refresca la lista
    },
    onError: (error) => {
      toast.error(error.message || "No se pudo ascender al militar");
    },
  });
}

