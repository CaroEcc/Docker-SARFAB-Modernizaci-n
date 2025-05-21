import { Guard, GuardFormData } from "@/types/guard.schema"

export type UpdateGuardAPIType = {
    formData: GuardFormData,
    guardId: Guard['guardId']
}