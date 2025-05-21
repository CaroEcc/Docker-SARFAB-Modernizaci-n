import api from "@/lib/axios";
import {
  CreateOperationCategoryForm,
  UpdateOperationCategoryForm,
  CreateOperationTypeForm,
  UpdateOperationTypeForm,
  OperationCategoryWithTypes,
} from "@/types/operationAndType.schema";
import { isAxiosError } from "axios";
import { GetOperationCategoriesParams } from "./types/OperationConfigAPIType.type";

// Create operation category
export async function createOperationCategory(formData: CreateOperationCategoryForm) {
  try {
    const { data } = await api.post("/operation-categories", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
  }
}

// Update operation category
export async function updateOperationCategory(id: number, formData: UpdateOperationCategoryForm) {
  try {
    const { data } = await api.put(`/operation-categories/${id}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
  }
}

// Get all categories with types
export async function getCategoriesWithTypes(
  params?: GetOperationCategoriesParams
): Promise<{ data: OperationCategoryWithTypes[]; totalPages: number }> {
  const { data } = await api.get("/operation-categories/categories-with-types", { params });
  return { data: data.data, totalPages: data.totalPages };
}

// Create operation type
export async function createOperationType(formData: CreateOperationTypeForm) {
  try {
    const { data } = await api.post("/operation-types", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
  }
}

// Update operation type
export async function updateOperationType(id: number, formData: UpdateOperationTypeForm) {
  try {
    const { data } = await api.put(`/operation-types/${id}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.error);
  }
}
