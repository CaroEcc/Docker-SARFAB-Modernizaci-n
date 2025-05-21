import { useRecruitForm } from "@/hooks/recruitment";
import { UseFormReturn } from "react-hook-form";
import { RecruitmentFormData } from "@/types/index";

export function useRecruitFormState(data: RecruitmentFormData): UseFormReturn<RecruitmentFormData> {
    return useRecruitForm({
        firstName: data.firstName,
        lastName: data.lastName,
        ci: data.ci,
        birthDate: data.birthDate,
        wantsMilitaryService: data.wantsMilitaryService
    });
}
