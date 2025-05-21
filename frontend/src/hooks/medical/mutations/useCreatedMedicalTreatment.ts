import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createMedicalTreatment } from "@/api/MedicalTreatmentAPI";

export function useCreatedMedicalTreatment() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createMedicalTreatment,
    onError: () => toast.error("Ocurrió un error al registrar el tratamiento"),
    onSuccess: () => {
      toast.success("Tratamiento registrado correctamente");
      navigate("/medical-treatment/list");
    },
  });
}