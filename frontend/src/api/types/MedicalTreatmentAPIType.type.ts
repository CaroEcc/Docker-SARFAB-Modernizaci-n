import { MedicalTreatment, MedicalTreatmentFormData } from "@/types/medicalTreatment.schema"

export type MedicalTreatmentAPIType = {
    formData: MedicalTreatmentFormData,
    medicalTreatmentId: MedicalTreatment['medicalTreatmentId']
}