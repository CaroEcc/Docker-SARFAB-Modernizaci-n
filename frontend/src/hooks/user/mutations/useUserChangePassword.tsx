import { userChangePassword } from "@/api/UserAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUserChangePassword() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: userChangePassword,
        onError: (ex) => toast.error(ex.message),
        onSuccess: () => {
            toast.success("Se cambio la contraseña correctamente");
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
}