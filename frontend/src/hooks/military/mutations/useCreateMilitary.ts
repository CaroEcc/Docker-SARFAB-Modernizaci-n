import { useMutation } from "@tanstack/react-query";
import { createMilitary } from "@/api/MilitaryAPI";
import { toast } from "react-toastify";

export function useCreateMilitary() {
    return useMutation({
        mutationFn: createMilitary,
        onError: () => toast.error("Ocurrió un error al registrar el personal militar"),
        onSuccess: () => {
            toast.success("Personal militar registrado correctamente");
        },
    });
}