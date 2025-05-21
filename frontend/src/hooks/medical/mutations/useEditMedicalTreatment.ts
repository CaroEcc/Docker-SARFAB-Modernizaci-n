import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateMedicalTreatment } from "@/api/MedicalTreatmentAPI";

export function useEditMedicalTreatment() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: updateMedicalTreatment,
        onError: () => toast.error("Ocurrió un error al actualizar el tratamiento"),
        onSuccess: () => {
            toast.success("Tratamiento actualizado correctamente");
            navigate("/medical-treatment/list");
        },
    });
}