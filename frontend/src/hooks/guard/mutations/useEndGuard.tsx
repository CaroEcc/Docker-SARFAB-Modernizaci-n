import { endGuard } from "@/api/GuardAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useEndGuard() {
    const queryClient = useQueryClient();
    const goTo = useNavigate()
    return useMutation({
        mutationFn: endGuard,
        onError: () => toast.error("Ocurrió un error al finalizar la guardia"),
        onSuccess: () => {
            toast.success("Guardia finalizada correctamente");
            queryClient.invalidateQueries({ queryKey: ['guard'] });
            goTo('/guards/list')
        },
    });
}