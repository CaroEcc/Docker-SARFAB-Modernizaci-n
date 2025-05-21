import api from "@/lib/axios";
import { EndGuardFormData, Guard, GuardFormData, baseGuardSchema, listGuardSchema, listShiftSchema } from "@/types/guard.schema";
import { isAxiosError } from "axios";
import { UpdateGuardAPIType } from "./types/GuardAPIType.type";

export async function getGuards(queryParams?: Record<string, any>) {
    try {
        const { data } = await api.get('/Guard', { params: queryParams });

        const response = listGuardSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getGuardById(id: Guard['guardId']) {
    try {
        const { data } = await api(`/Guard/${id}`);
        const response = baseGuardSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function createGuard(formData: GuardFormData) {
    try {
        const { data } = await api.post('/Guard', formData)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateGuard({ formData, guardId }: UpdateGuardAPIType) {
    try {
        const newFormData = {
            guardId: guardId,
            ...formData
        };
        const { data } = await api.put(`/Guard`, newFormData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function endGuard(formData: EndGuardFormData) {
    try {
        const { data } = await api.put(`/Guard/end-guard`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getShift() {
    try {
        const { data } = await api.get('/Shift')
        const response = listShiftSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}