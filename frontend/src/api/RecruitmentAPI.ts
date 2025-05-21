import { listRecruitmentSchema, Recruit, RecruitmentFormData } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { RecruitAPIType, RecruitStatusAPIType } from "./types/RecruitAPIType.type";

export async function createRecruitment(formData: RecruitmentFormData) {
    try {
        const { data } = await api.post('/Recruitment', formData)

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getRecruitment(queryParams?: Record<string, any>) {
    try {
        const { data } = await api.get('/Recruitment', { params: queryParams })
        const response = listRecruitmentSchema.safeParse(data);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getRecruitById(id: Recruit['recruitmentId']) {
    try {
        const { data } = await api(`/Recruitment/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateRecruit({ formData, recruitId }: RecruitAPIType) {
    try {
        const { data } = await api.patch(`/Recruitment/${recruitId}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateRecruitStatus({ recruitId, status }: RecruitStatusAPIType) {
    try {
        const { data } = await api.patch(`/Recruitment/${recruitId}/status`, { status });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}