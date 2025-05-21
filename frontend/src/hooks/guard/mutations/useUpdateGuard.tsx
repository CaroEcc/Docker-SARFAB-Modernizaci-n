import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateGuard } from "@/api/GuardAPI";

export function useUpdateGuard() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: updateGuard,
        onError: () => toast.error("Ocurrió un error al actualizar la guardia"),
        onSuccess: () => {
            toast.success("Guardia actualizada correctamente");
            navigate("/guards/list");
        },
    });
}