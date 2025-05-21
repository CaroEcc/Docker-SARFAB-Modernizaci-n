import { statusChangeVolunteer } from "@/api/VolunteerAPI";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useStatusChangeVolunteer(errorMessage: string, successMessage: string) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: statusChangeVolunteer,
    onError: (error) => {
      const errorMsg = error.message?.trim() || errorMessage || "Ocurrió un error inesperado";
      toast.error(errorMsg);
      navigate(-1);
    },
    onSuccess: () => {
      toast.success(successMessage || "Operación realizada correctamente");
    },
  });
}