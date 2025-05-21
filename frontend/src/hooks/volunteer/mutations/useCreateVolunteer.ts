import { createVolunteer } from "@/api/VolunteerAPI";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreateVolunteer() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createVolunteer,
    onError: () => toast.error("Ocurrió un error al registrar el voluntario"),
    onSuccess: () => {
      toast.success("Voluntario registrado correctamente");
      navigate("/volunteers/active-volunteers");
    },
  });
}
