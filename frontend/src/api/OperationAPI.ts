import api from "@/lib/axios";
import { AbsenceMarkResponse, CreateOperationForm, ListOperationResponse, OperationDetailResponse, UpdateOperationForm, UpdateOperationStatusForm, UpdatePersonStatusForm } from "@/types/operation.schema";
import { isAxiosError } from "axios";
import { GetOperationParams } from "./types/OperationAPIType.type";

// Create Operation
export async function createOperation(formData: CreateOperationForm) {
  try {
    const { data } = await api.post("/SarOperation", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// Update Operation
export async function updateOperation(formData: UpdateOperationForm, id: number) {
  try {
    const { data } = await api.patch(`/SarOperation/${id}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// Update Operation Status
export async function updateOperationStatus(formData: UpdateOperationStatusForm, id: number) {
  try {
    const { data } = await api.patch(`/SarOperation/${id}/status`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// Get Operation by ID
export async function getOperationById(id: number): Promise<OperationDetailResponse> {
  try {
    const { data } = await api.get(`/SarOperation/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

// Get Operations
export async function getOperations(queryParams?: GetOperationParams): Promise<ListOperationResponse> {
  try {
    const { data } = await api.get("/SarOperation", { params: queryParams });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

// Absence Operation mark
export async function GetmarkOperationAbsenceInfo(id: number): Promise<AbsenceMarkResponse> {
  try {
    const { data } = await api.get(`/SarOperation/get-data-mark-absence/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

// Update status person operation
export async function updatePersonStatusOperation(formData: UpdatePersonStatusForm) {
  try {
    const { data } = await api.patch(`/SarOperation/update-status-person-operation`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}