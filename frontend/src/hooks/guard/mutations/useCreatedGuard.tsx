import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createGuard } from "@/api/GuardAPI";

export function useCreatedGuard() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createGuard,
        onError: () => toast.error("Ocurrió un error al registrar la guardia"),
        onSuccess: () => {
            toast.success("Guardia registrada correctamente");
            navigate("/guards/list");
        },
    });
}