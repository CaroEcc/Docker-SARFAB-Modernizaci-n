import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { assignCourseVolunteer } from "@/api/CourseVolunteerAPI";

export function useAssingCourseVolunteer() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignCourseVolunteer,
    onError: () => {
      toast.error("Ocurrió un error al actualizar el estado del recluta.");
    },
    onSuccess: () => {
      toast.success(`El recluta ha sido correctamente.`);
      queryClient.invalidateQueries({queryKey: ["volunteersActive"]});
      navigate('/volunteers/active-volunteers');
    },
  });
}
