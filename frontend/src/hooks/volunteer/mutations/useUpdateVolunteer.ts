import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateVolunteer } from "@/api/VolunteerAPI";

export function useUpdateVolunteer() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: updateVolunteer,
    onError: () => toast.error("Ocurrió un error al actualizar el voluntario"),
    onSuccess: () => {
      toast.success("Voluntario actualizado correctamente");
      navigate("/volunteers/active-volunteers");
    },
  });
}