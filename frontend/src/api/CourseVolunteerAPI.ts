import api from "@/lib/axios";
import { CourseVolunteer, lastCourseVolunteer, listVoluntareerCompletedCourses } from "@/types/courseVolunteer.schema";
import { isAxiosError } from "axios";
import { Volunteer } from "../types";

export async function assignCourseVolunteer(formData: CourseVolunteer) {
    try {
        const { data } = await api.post(`/Course/assign-course`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getVolunteerCompletedCourses(id: Volunteer['id'], queryParams?: Record<string, any>) {
    try {
        const { data } = await api(`/Course/volunteer/${id}/completed-courses`, { params: queryParams });
        const response = listVoluntareerCompletedCourses.safeParse(data);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            if (error.response.status === 404) {
                throw {
                    status: 404,
                    message: 'El voluntario no tiene cursos registrados aún.',
                };
            }
            throw new Error(error.response.data?.error || 'Error desconocido');
        }
        throw new Error('Error al consultar los cursos completados');
    }
}

export async function getLastCourseVolunteer(id: Volunteer['id']) {
    try {
        const { data } = await api(`/Course/volunteer-last-course/${id}`);
        const response = lastCourseVolunteer.safeParse(data);
        if (response.success) {
            return response.data;
        } else {
            throw new Error("Formato de datos inválido");
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            if (error.response.status === 400) {
                throw {
                    status: 400,
                    message: 'No se encontró el último curso completado.',
                };
            }
            throw new Error(error.response.data.error || "Error desconocido del servidor")
        }
        throw new Error('Error al consultar el ultimo curso completado');
    }
}