import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteUser } from "@/api/UserAPI";

export function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUser,
        onError: () => toast.error("Ocurrio un error al eliminar el usuario"),
        onSuccess: () => {
            toast.success("Usuario eliminado correctamente");
            queryClient.invalidateQueries({ queryKey: ['getUsers'] });
        },
    });
}