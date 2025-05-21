import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Volunteer } from "../types";
import { MedicalCheckup, MedicalCheckupVolunteerFormData } from "@/types/volunteerMedicalCheckup";
import { MedicalCheckupAPIType } from "./types/MedicalCheckupAPIType.type";

export async function getVolunteerMedicalCheckup(id: Volunteer['id']) {
    try {
        const { data } = await api(`/MedicalCheckup/volunteer-medical-checkups/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function createMedicalCheckup(formData: MedicalCheckupVolunteerFormData) {
    try {
        const { data } = await api.post('/MedicalCheckup/create-medical-checkup', formData)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getMedicalCheckupById(id: MedicalCheckup['checkupId']) {
    try {
        const { data } = await api(`/MedicalCheckup/Volunteer-medical-checkup/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateMedicalCheckup({ formData, medicalCheckupId }: MedicalCheckupAPIType) {
    try {
        const { data } = await api.patch(`/MedicalCheckup/update-medical-checkup/${medicalCheckupId}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}