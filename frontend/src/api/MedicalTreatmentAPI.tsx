import { MedicalTreatment, MedicalTreatmentFormData, listMedicalTreatmentSchema, medicalTreatmentFormSchema } from "@/types/medicalTreatment.schema";
import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { MedicalTreatmentAPIType } from "./types/MedicalTreatmentAPIType.type";
import { convertTodDataBaseFormatDate } from "@/utils/common/formatDate";

export async function createMedicalTreatment(formData: MedicalTreatmentFormData) {
    try {
        const { treatmentDate, description, ...restFormData } = formData;

        const newFormData = {
            treatmentDescription: description,
            treatmentDate: convertTodDataBaseFormatDate(treatmentDate),
            ...restFormData
        };
        const { data } = await api.post('/MedicalTreatment', newFormData)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getMedicalTreatment(queryParams?: Record<string, any>) {
    try {
        const { data } = await api.get('/MedicalTreatment', { params: queryParams })
        const response = listMedicalTreatmentSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getMedicalTreatmentById(id: MedicalTreatment['medicalTreatmentId']) {
    try {
        const { data } = await api(`/MedicalTreatment/${id}`);
        const response = medicalTreatmentFormSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateMedicalTreatment({ formData, medicalTreatmentId }: MedicalTreatmentAPIType) {
    try {
        const { treatmentDate, description, ...restFormData } = formData;

        const newFormData = {
            treatmentID: medicalTreatmentId,
            treatmentDescription: description,
            treatmentDate: convertTodDataBaseFormatDate(treatmentDate),
            ...restFormData
        };
        const { data } = await api.put(`/MedicalTreatment`, newFormData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}