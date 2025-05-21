import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateMedicalCheckup } from "@/api/VolunteerMedicalCheckupAPI";

export function useUpdateVolunteerMedicalCheckup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMedicalCheckup,
    onError: () => toast.error("Ocurrió un error actualizando el chequeo médico"),
    onSuccess: () => {
      toast.success("Chequeo médico actualizado correctamente");
      queryClient.invalidateQueries({ queryKey: ['volunteerMedicalCheckup'] });
      navigate(-1);
    },
  });
}
