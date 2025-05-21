import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { CreateUserFormDataSchema, UpdateUserFormDataSchema, listUsersSchema, userBaseSchema, UserSchema, UpdateUserPasswordFormDataSchema, PasswordRecoveryFormDataSchema, UserChangePasswordFormDataSchema } from "../types";

export async function getUsers(queryParams?: Record<string, any>) {
    try {
        const { data } = await api.get('/User', { params: queryParams })
        const response = listUsersSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUserById(id: UserSchema['userId']) {
    try {
        const { data } = await api.get(`/User/${id}`)
        const response = userBaseSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function createUser(formData: CreateUserFormDataSchema) {
    try {
        const { data } = await api.post('/User', formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const apiError = error.response.data;

            throw new Error(apiError.message || 'Error desconocido');
        } else {
            throw new Error('Ha ocurrido un error inesperado');
        }
    }
}

export async function updateUser(formData: UpdateUserFormDataSchema) {
    try {
        const { data } = await api.put('/User', formData)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const apiError = error.response.data;

            throw new Error(apiError.message || 'Error desconocido');
        } else {
            throw new Error('Ha ocurrido un error inesperado');
        }
    }
}

export async function deleteUser(id: UserSchema['userId']) {
    try {
        const { data } = await api.delete(`/User/${id}`)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function EnableUser(id: UserSchema['userId']) {
    try {
        const { data } = await api.post(`/User/${id}`)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function changePasswordUser(formData: UpdateUserPasswordFormDataSchema) {
    try {
        const { data } = await api.put('/User/change-password', formData)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function passwordRecoveryByAdmin(id: UserSchema['userId']) {
    try {
        const { data } = await api.put(`/User/recovery-password/${id}`)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function passwordRecoveryByUser(formData: PasswordRecoveryFormDataSchema) {
    try {
        const { data } = await api.put('/User/recovery-password', formData)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const apiError = error.response.data;

            throw new Error(apiError.message || 'Error desconocido');
        } else {
            throw new Error('Ha ocurrido un error inesperado');
        }
    }
}

export async function userChangePassword(formData: UserChangePasswordFormDataSchema) {
    try {
        const { data } = await api.put('/User/change-password/user', formData)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const apiError = error.response.data;

            throw new Error(apiError.message || 'Error desconocido');
        } else {
            throw new Error('Ha ocurrido un error inesperado');
        }
    }
}