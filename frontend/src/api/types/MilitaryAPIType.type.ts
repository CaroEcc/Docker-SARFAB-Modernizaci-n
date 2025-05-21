import { Military, UpdateMilitaryForm } from "@/types/index";

export type MilitaryAPIType = {
    formData: UpdateMilitaryForm;
    militaryId: Military['id'];
};

export type MilitaryStatusAPIType = {
  militaryId: Military['id'];
  status: number;
};

export interface GetMilitaryParams {
  searchTerm?: string;
  status?: number;
  page?: number;
  pageSize?: number;
  orderByLastNameAsc?: boolean;
  rankFilter?: number;
  rankId?: number;
}
