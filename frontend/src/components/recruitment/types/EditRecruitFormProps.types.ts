import { Recruit, RecruitmentFormData } from "@/types/index"

export interface EditRecruitFormProps {
    data: RecruitmentFormData;
    recruitId: Recruit['recruitmentId']
}