import { Dispatch, SetStateAction } from "react";

export interface MilitaryFiltersProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: Dispatch<SetStateAction<string>>;
  statusOptions: { value: string; label: string }[];
  rankFilter?: number | null;
  setRankFilter?: (value: number | null) => void;
  rankOptions?: { value: number; label: string }[];
  orderByLastNameAsc: boolean;
  setOrderByLastNameAsc: Dispatch<SetStateAction<boolean>>;
}
