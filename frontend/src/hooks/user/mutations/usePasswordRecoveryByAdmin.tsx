import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { passwordRecoveryByAdmin } from "@/api/UserAPI";

export function usePasswordRecoveryByAdmin() {
    return useMutation({
        mutationFn: passwordRecoveryByAdmin,
        onError: () => toast.error("Ocurrio un error al restaurar la contraseña del usuario del usuario"),
        onSuccess: () => {
            toast.success("Contreseña restaurada correctamente");
        },
    });
}