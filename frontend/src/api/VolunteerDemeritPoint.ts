import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { totalPointsLostSchema, Volunteer } from "../types";
import { listDemeritPointsSchema } from "@/types/demeritPoint.schema";

export async function getVolunteerTotalDemeritPoint(id: Volunteer['id']) {
    try {
        const { data } = await api.get(`/DemeritPoint/volunteer-total-points/${id}`)
        const response = totalPointsLostSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getVolunteerDemeritPointLostPoints(id: Volunteer['id']) {
    try {
        const { data } = await api.get(`/DemeritPoint/volunteer-lost-points/${id}`)
        const response = listDemeritPointsSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteDemeritPoint(id: string) {
    try {
        const response = await api.delete(`/DemeritPoint/delete-demerit-point/${id}`);
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}