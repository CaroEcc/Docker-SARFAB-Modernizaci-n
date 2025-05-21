import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { EnableUser } from "@/api/UserAPI";

export function useEnableUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: EnableUser,
        onError: () => toast.error("Ocurrio un error al habilitar el usuario"),
        onSuccess: () => {
            toast.success("Usuario habilitado correctamente");
            queryClient.invalidateQueries({ queryKey: ['getUsers'] });
        },
    });
}