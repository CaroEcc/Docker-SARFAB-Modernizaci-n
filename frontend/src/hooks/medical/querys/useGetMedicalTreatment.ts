import { getMedicalTreatmentById } from "@/api/MedicalTreatmentAPI";
import { useQuery } from "@tanstack/react-query";

export function useGetMedicalTreatment(medicalTreatmentId: number) {
    return useQuery({
        queryKey: ['medicalTreatmentId', medicalTreatmentId],
        queryFn: () => getMedicalTreatmentById(medicalTreatmentId),
        retry: false
    });
}