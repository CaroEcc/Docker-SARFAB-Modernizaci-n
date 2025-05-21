
import { gradePromotionVolunteer } from "@/api/VolunteerAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useGradePromotionVolunteer() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gradePromotionVolunteer,
    onError: (error) => {
      const errorMessage = error.message?.trim() || "Ocurrió un error al Ascender al voluntario";
      toast.error(errorMessage);
      navigate(-1);
    },
    onSuccess: (_, variables) => {
      toast.success("Voluntario ascendido correctamente");
      queryClient.invalidateQueries({queryKey: ["volunteersActive"]});
      queryClient.invalidateQueries({queryKey: ['editVolunteer', variables]});
      navigate(-1);
    },
  });
}
