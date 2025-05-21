import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { listVolunteerActiveSchema, listVolunteerGuardsReportSchema, listVolunteerHistoricalSchema, listVolunteerOperationsReportSchema, Volunteer, VolunteerFormData } from "@/types/volunteer.schema";
import { VolunteerAPIType, VolunteerStatusAPIType } from "./types/VolunteerAPIType.type";

export async function createVolunteer(formData: VolunteerFormData) {
    try {
        const { data } = await api.post('/Volunteer', formData)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getVolunteerActiveList(queryParams?: Record<string, any>) {
    try {
        const { data } = await api.get('/Volunteer/active-volunteers', { params: queryParams })
        const response = listVolunteerActiveSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getVolunteerHistoricalList(queryParams?: Record<string, any>) {
    try {
        const { data } = await api.get('/Volunteer/historical-list', { params: queryParams })
        const response = listVolunteerHistoricalSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getVolunteerGuardsReportList(id: Volunteer['id'], queryParams?: Record<string, any>) {
    try {
        const { data } = await api.get(`/Guard/report/${id}`, { params: queryParams })
        const response = listVolunteerGuardsReportSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getVolunteerOperationsReportList(id: Volunteer['id'], queryParams?: Record<string, any>) {
    try {
        const { data } = await api.get(`/VolunteerOperation/volunteer/${id}/operations-report`, { params: queryParams })
        const response = listVolunteerOperationsReportSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getVolunteerById(id: Volunteer['id']) {
    try {
        const { data } = await api(`/Volunteer/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function updateVolunteer({ formData, volunteerId }: VolunteerAPIType) {
    try {
        const { data } = await api.patch(`/Volunteer/${volunteerId}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function gradePromotionVolunteer(volunteerId: Volunteer['id']) {
    try {
        const { data } = await api.patch(`/VolunteerGradePromotion/${volunteerId}/promote`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error de conexión con el servidor");
    }
}

export async function statusChangeVolunteer({ volunteerId, formData }: VolunteerStatusAPIType) {
    try {
        const { data } = await api.patch(`/Volunteer/${volunteerId}/status`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error de conexión con el servidor");
    }
}

export async function getAllVolunteerOperationsForReport(id: Volunteer['id'], queryParams?: Record<string, any>) {
    try {
        const { data } = await api.get(`/VolunteerOperation/volunteer/${id}/all-operations-for-report`, { params: queryParams });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("Error al obtener datos para el reporte");
    }
}