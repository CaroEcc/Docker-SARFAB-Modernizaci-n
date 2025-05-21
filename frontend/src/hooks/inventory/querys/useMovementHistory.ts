import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { getMovementHistory } from "@/api/InventoryAPI";
import { GetMovementHistoryParams } from "@/api/types/InventoryAPIType.type";
import { useSearchParams } from "react-router-dom";

export function useMovementHistory(initialParams: GetMovementHistoryParams = {}) {
  const [searchParams] = useSearchParams();
  const searchFromUrl = searchParams.get("search") ?? "";

  const [searchValue, setSearchValue] = useState("");
  const [movementType, setMovementType] = useState<number | undefined>(initialParams.movementType);
  const [startDate, setStartDate] = useState(initialParams.startDate);
  const [endDate, setEndDate] = useState(initialParams.endDate);
  const [pageIndex, setPageIndex] = useState(initialParams.pageIndex ?? 1);
  const [pageSize, setPageSize] = useState(initialParams.pageSize ?? 10);

  const [debouncedSearch] = useDebounce(searchValue, 500);

  useEffect(() => {
    if (searchFromUrl) {
      setSearchValue(searchFromUrl);
    }
  }, [searchFromUrl]);

  const filters: GetMovementHistoryParams = {
    searchTerm: debouncedSearch || undefined,
    movementType,
    startDate,
    endDate,
    pageIndex,
    pageSize,
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["movement-history", filters],
    queryFn: () => getMovementHistory(filters),
    retry: false,
  });

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setPageIndex(1);
  };

  const handleMovementTypeChange = (value: number | undefined) => {
    setMovementType(value);
    setPageIndex(1);
  };

  useEffect(() => {
    refetch();
  }, [debouncedSearch]);

  return {
    data,
    isLoading,
    refetch,
    searchValue,
    setSearchValue: handleSearchChange,
    movementType,
    setMovementType: handleMovementTypeChange,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
  };
}
