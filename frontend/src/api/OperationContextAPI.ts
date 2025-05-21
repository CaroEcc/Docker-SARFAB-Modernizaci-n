import api from "@/lib/axios";
import { CreateOperationContextSchema, MilitaryWithRankSchema, OperationCategorySchema, OperationContextSchema, VolunteerWithRankSchema } from "@/types/operationContext.schema";
import { isAxiosError } from "axios";

// Obtener información de contexto para filtro de operaciones
export async function getOperationContext() {
  try {
    const { data } = await api.get("/ContextData/operation-list-filter");
    return OperationContextSchema.parse(data);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Error fetching operation context");
    }
    throw error;
  }
}

// Obtener información de contexto para creación de operaciones
export async function getCreateOperationContext(){
  try {
    const { data } = await api.get("/ContextData/operation-context");
    return CreateOperationContextSchema.parse(data);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Error fetching operation context");
    }
    throw error;
  }

}

export async function getVolunteersWithGrade(){
  try {
    const { data } = await api.get("/ContextData/volunteers-with-rank");
    return VolunteerWithRankSchema.array().parse(data);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Error fetching volunteers with grade");
    }
    throw error;
  }
}

export async function getMilitaryWithRank() {
  try {
    const { data } = await api.get("/ContextData/military-personnel-with-rank");
    return MilitaryWithRankSchema.array().parse(data);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Error fetching military with rank");
    }
    throw error;
  }
}

export async function getOperationCategories() {
  try {
    const { data } = await api.get("/ContextData/operation-categories");
    return OperationCategorySchema.array().parse(data);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Error fetching operation categories");
    }
    throw error;
  }
}

export async function getVolunteersWithoutCourse(courseId: number) {
  try {
    const { data } = await api.get(`/ContextData/volunteers-without-course/${courseId}`);
    return VolunteerWithRankSchema.array().parse(data);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Error fetching volunteers without course");
    }
    throw error;
  }
}