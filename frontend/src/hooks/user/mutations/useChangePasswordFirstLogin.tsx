import { changePasswordUser } from "@/api/UserAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useChangePasswordFirstLogin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: changePasswordUser,
        onError: () => toast.error("Ocurrio un error al cambiar de contraseña"),
        onSuccess: () => {
            toast.success("Se cambio la contraseña correctamente");
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
}