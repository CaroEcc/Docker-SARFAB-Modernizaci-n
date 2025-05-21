import { MedicalTreatmentFormData } from "@/types/medicalTreatment.schema";
import { VolunteerWithRankList } from "@/types/operationContext.schema";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";

export interface MedicalTreatmentFormProps {
    volunteersData: VolunteerWithRankList | undefined;
    errors: FieldErrors<MedicalTreatmentFormData>;
    register: UseFormRegister<MedicalTreatmentFormData>;
    control: Control<MedicalTreatmentFormData>;
}