export interface OperationFilterProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  statusFilter: number | undefined; 
  setStatusFilter: (value: number | undefined) => void;
  statusOptions: { id: number; name: string }[]; 
  municipalityFilter: number | undefined; 
  setMunicipalityFilter: (value: number | undefined) => void;
  municipalityOptions: { id: number; name: string }[];
  categoryFilter: number | undefined;
  setCategoryFilter: (value: number | undefined) => void;
  categoryOptions: { id: number; name: string }[];
  setStartDateFilter: (value: string | undefined) => void;
  setEndDateFilter: (value: string | undefined) => void;
  refetch: () => void;
}
