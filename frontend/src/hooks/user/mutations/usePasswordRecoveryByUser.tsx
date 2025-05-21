import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { passwordRecoveryByUser } from "@/api/UserAPI";

export function usePasswordRecoveryByUser() {
    return useMutation({
        mutationFn: passwordRecoveryByUser,
        onError: (e) => toast.error(e.message),
        onSuccess: () => {
            toast.success("Se restauro su contrseña, revise su correo");
        },
    });
}