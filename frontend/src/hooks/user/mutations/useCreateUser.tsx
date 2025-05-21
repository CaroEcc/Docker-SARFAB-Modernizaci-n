import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createUser } from "@/api/UserAPI";

export function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createUser,
        onError: (ex) => toast.error(ex.message),
        onSuccess: () => {
            toast.success("Usuario creado correctamente");
            queryClient.invalidateQueries({ queryKey: ['getUsers'] });
        },
    });
}