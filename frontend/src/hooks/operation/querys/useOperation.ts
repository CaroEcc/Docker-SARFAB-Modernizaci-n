import { getOperations } from "@/api/OperationAPI";
import { GetOperationParams } from "@/api/types/OperationAPIType.type";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export function useOperation(params: GetOperationParams = {}) {
  const [searchValue, setSearchValue] = useState(params.searchTerm ?? "");
  const [statusFilter, setStatusFilter] = useState(params.status);
  const [municipalityFilter, setMunicipalityFilter] = useState(params.municipalityId);
  const [categoryFilter, setCategoryFilter] = useState(params.categoryId);
  const [startDateFilter, setStartDateFilter] = useState(params.startDate);
  const [endDateFilter, setEndDateFilter] = useState(params.endDate);
  const [pageIndex, setPageIndex] = useState(params.page ?? 1);
  const [pageSizeState, setPageSize] = useState(params.pageSize ?? 10);
  
  const [debouncedSearch] = useDebounce(searchValue, 500);

  const filters = {
    searchTerm: debouncedSearch,
    status: statusFilter,
    municipalityId: municipalityFilter || undefined,
    categoryId: categoryFilter || undefined,
    startDate: startDateFilter || undefined,
    endDate: endDateFilter || undefined,
    page: pageIndex,
    pageSize: pageSizeState,
  };
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["operation", filters],
    queryFn: () => getOperations(filters),
    // placeholderData: keepPreviousData,
    retry: false,
  });

  return {
    data, isLoading, refetch,
    searchValue, setSearchValue,
    statusFilter, setStatusFilter,
    municipalityFilter, setMunicipalityFilter,
    categoryFilter, setCategoryFilter,
    startDateFilter, setStartDateFilter,
    endDateFilter, setEndDateFilter,
    pageIndex, setPageIndex,
    pageSize: pageSizeState, setPageSize,
  };
}
