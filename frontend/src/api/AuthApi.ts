import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { UserLoginForm, userSchema } from "@/types/index";

export async function authenticateUser(formData: UserLoginForm) {
   try {
      const url = '/Auth/Login';
      const { data } = await api.post(url, formData);
      if (!data) throw new Error("Ha ocurrido un error inesperado");

      localStorage.setItem('AUTH_TOKEN', data.token);
      return data;
   } catch (error) {
      if (isAxiosError(error)) {
         if (error.response) {
            throw new Error(error.response.data.message || "Error desconocido");
         } else {
            throw new Error("No se pudo conectar con el servidor");
         }
      }
      throw new Error("Ha ocurrido un error inesperado");
   }
}

export async function getUser() {
  try {
     const url = '/Auth/user';
     const { data } = await api(url);
     const response = userSchema.safeParse(data.user);
     if (response.success) {
        return response.data;
     }
     return null;
  } catch (error) {
     if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
     }
     throw error;
  }
}
