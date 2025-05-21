import { MedicalCheckup, MedicalCheckupVolunteerUpdateFormData } from "@/types/volunteerMedicalCheckup"

export type MedicalCheckupAPIType = {
    formData: MedicalCheckupVolunteerUpdateFormData,
    medicalCheckupId: MedicalCheckup['checkupId']
}