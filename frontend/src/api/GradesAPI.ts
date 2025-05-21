import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { listGrades } from "@/types/grades.schema.ts";

export async function getGrades() {
    try {
        const { data } = await api.get('/Volunteer/grades')
        const response = listGrades.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}