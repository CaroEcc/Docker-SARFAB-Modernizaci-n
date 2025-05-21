import { MedicalTreatmentFormData } from "@/types/medicalTreatment.schema";
import { VolunteerWithRankList } from "@/types/operationContext.schema";
import { Control, FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

export interface EditMedicalTreatmentFormProps {
    volunteersData: VolunteerWithRankList | undefined;
    errors: FieldErrors<MedicalTreatmentFormData>;
    register: UseFormRegister<MedicalTreatmentFormData>;
    control: Control<MedicalTreatmentFormData>;
    watch: UseFormWatch<MedicalTreatmentFormData>
    readonly: boolean;
}