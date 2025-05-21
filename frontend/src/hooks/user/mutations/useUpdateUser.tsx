import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateUser } from "@/api/UserAPI";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateUser,
        onError: (ex) => toast.error(ex.message),
        onSuccess: () => {
            toast.success("Usuario actualizado correctamente");
            queryClient.invalidateQueries({ queryKey: ['getUsers'] });
        },
    });
}