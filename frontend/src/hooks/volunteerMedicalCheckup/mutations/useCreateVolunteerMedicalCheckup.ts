import { createMedicalCheckup } from "@/api/VolunteerMedicalCheckupAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCreateVolunteerMedicalCheckup() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: createMedicalCheckup,
      onError: () => toast.error("Ocurrió un error al añadir chequeo médico"),
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ['volunteerMedicalCheckup'] });
      },
    });
  }