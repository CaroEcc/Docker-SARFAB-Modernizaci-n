import { useState } from "react";
import { useDebounce } from "use-debounce";
import { UseMilitaryOptions} from "@/hooks/types/militaryTypes";

export function useMilitaryFilters({
  initialSearchValue = "",
  initialStatusFilter = "",
  initialPageIndex = 1,
  initialPageSize = 10,
  initialOrderByLastNameAsc = true,
}: UseMilitaryOptions) {
  const [searchValue, setSearchValue] = useState<string>(initialSearchValue);
  const [statusFilter, setStatusFilter] = useState<string>(initialStatusFilter);
  const [pageIndex, setPageIndex] = useState<number>(initialPageIndex);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [orderByLastNameAsc, setOrderByLastNameAsc] = useState<boolean>(initialOrderByLastNameAsc);
  const [rankFilter, setRankFilter] = useState<number | null>(null);

  const [debouncedSearch] = useDebounce(searchValue, 500);

  return {
    searchTerm: debouncedSearch,
    status: statusFilter,
    page: pageIndex,
    pageSize,
    orderByLastNameAsc,
    rankId: rankFilter ?? null,

    setSearchValue,
    setStatusFilter,
    setPageIndex,
    setPageSize,
    setOrderByLastNameAsc,
    setRankFilter,
  };
}
