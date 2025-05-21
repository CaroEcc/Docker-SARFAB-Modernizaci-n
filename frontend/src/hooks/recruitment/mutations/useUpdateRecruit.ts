import { useMutation } from "@tanstack/react-query";
import { updateRecruit } from "@/api/RecruitmentAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useUpdateRecruit() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: updateRecruit,
    onError: () => toast.error("Ocurrió un error al actualizar el recluta"),
    onSuccess: () => {
      toast.success("Recluta actualizado correctamente");
      navigate("/recruitment/list");
    },
  });
}
