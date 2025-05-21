import { medicalTreatmentFormSchema, MedicalTreatmentFormData } from "@/types/medicalTreatment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useMedicalTreatmentForm(defaultValues: Partial<MedicalTreatmentFormData>) {
    return useForm<MedicalTreatmentFormData>({
        resolver: zodResolver(medicalTreatmentFormSchema),
        defaultValues: defaultValues || {
            treatmentDate: '',
            diagnosis: '',
            description: '',
            patientPersonId: 0,
            attendingPersonId: 0
        },
    });
}