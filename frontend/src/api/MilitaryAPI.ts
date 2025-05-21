import {
  ListMilitarySchema,
  CreateMilitarySchema,
  Military,
  CreateMilitaryForm,
  ListMilitaryResponse,
  UpdateMilitaryForm,
} from '@/types/index';
import { UpdateEntityParams } from '@/api/types/UpdateEntityParams.type';
import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import {
  MilitaryStatusAPIType,
  GetMilitaryParams,
} from './types/MilitaryAPIType.type';

export async function createMilitary(formData: CreateMilitaryForm) {
  const validation = CreateMilitarySchema.safeParse(formData);
  if (!validation.success) {
    throw new Error('Datos inválidos');
  }
  try {
    const { data } = await api.post('/Military', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getMilitary(
  queryParams?: GetMilitaryParams,
): Promise<ListMilitaryResponse | null> {
  try {
    if (queryParams?.rankFilter) {
      queryParams.rankId = Number(queryParams.rankFilter);
      delete queryParams.rankFilter;
    }
    const { data } = await api.get('/Military/active-militaries', {
      params: queryParams,
    });
    const response = ListMilitarySchema.safeParse(data);
    return response.success ? response.data : null;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    return null;
  }
}

export async function getMilitaryById(id: Military['id']): Promise<Military> {
  try {
    const { data } = await api.get(`/Military/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function updateMilitary({ formData, entityId }: UpdateEntityParams<UpdateMilitaryForm>) {
  try {
    const { data } = await api.patch(`/Military/${entityId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateMilitaryStatus({
  militaryId,
  status,
}: MilitaryStatusAPIType) {
  try {
    const { data } = await api.patch(`/Military/${militaryId}/status`, {
      status,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getMilitaryRanks() {
  try {
    const { data } = await api.get('/Military/ranks');
    if (!Array.isArray(data)) throw new Error('Invalid response format');
    return data.map((rank: { id: number; name: string }) => ({
      value: rank.id,
      label: rank.name,
      isSelected: false,
    }));
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function promoteMilitary(militaryId: number) {
  try {
    const { data } = await api.patch(`/MilitaryRankAssignment/${militaryId}/promote`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al ascender militar");
    }
    throw error;
  }
}
