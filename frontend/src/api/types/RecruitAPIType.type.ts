import { Recruit, RecruitmentFormData } from "@/types/index"

export type RecruitAPIType = {
    formData: RecruitmentFormData,
    recruitId: Recruit['recruitmentId']
}

export type RecruitStatusAPIType = { recruitId: Recruit['recruitmentId']; status: number}