export interface UseMilitaryOptions {
  initialSearchValue?: string;
  initialStatusFilter?: string;
  initialPageIndex?: number;
  initialPageSize?: number;
  initialOrderByLastNameAsc?: boolean;
}

export interface MilitaryFilters {
  searchTerm: string;
  status: string;
  page: number;
  pageSize: number;
  orderByLastNameAsc: boolean;
  rankId: number | null;
}

export interface RankOption {
  value: number;
  label: string;
}
