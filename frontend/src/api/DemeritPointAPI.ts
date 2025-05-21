import api from "@/lib/axios";
import { DemeritPoint } from "@/types/demeritPoint.schema";
import { isAxiosError } from "axios";

export async function CreateDemeritPoint(formData: DemeritPoint) {
  try {
    const { data } = await api.post("/DemeritPoint/create-demerit-point", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}