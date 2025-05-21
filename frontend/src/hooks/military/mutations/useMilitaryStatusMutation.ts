import { updateMilitaryStatus } from "@/api/MilitaryAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useMilitaryStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMilitaryStatus,
    onError: () => toast.error("Ocurrió un error al actualizar el estado del militar"),
    onSuccess: () => {
      toast.success("Estado del militar actualizado correctamente");
      queryClient.invalidateQueries({ queryKey: ["military"] });
    },
  });
}
