import { UseFormRegister, FieldErrors, Control } from "react-hook-form";
import { RecruitmentFormData } from "types";

export interface RecruitFormProps {
    errors:  FieldErrors<RecruitmentFormData>;
    register: UseFormRegister<RecruitmentFormData>;
    control: Control<RecruitmentFormData>;
} 