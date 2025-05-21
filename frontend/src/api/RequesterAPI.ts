import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function getRequesters(searchTerm?: string, page = 1, pageSize = 10) {
  try {
    const { data } = await api.get('/requesters', {
      params: { searchTerm, page, pageSize }
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      if (error.response.status === 404) return { data: [], totalPages: 0 };
      throw new Error(error.response.data.error || "Error al obtener los solicitantes");
    }
    throw new Error("Error de conexión con el servidor");
  }
}
