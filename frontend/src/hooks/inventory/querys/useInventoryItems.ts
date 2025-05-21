import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { getInventoryItems } from "@/api/InventoryAPI";
import { GetInventoryItemsParams } from "@/api/types/InventoryAPIType.type";

export function useInventoryItems(initialParams: GetInventoryItemsParams = {}) {
  const [searchValue, setSearchValue] = useState(initialParams.searchTerm ?? "");
  const [orderByNameAsc, setOrderByNameAsc] = useState(initialParams.orderByNameAsc ?? true);
  const [pageIndex, setPageIndex] = useState(initialParams.pageIndex ?? 1);
  const [pageSize, setPageSize] = useState(initialParams.pageSize ?? 10);

  const [debouncedSearch] = useDebounce(searchValue, 500);

  const filters: GetInventoryItemsParams = {
    searchTerm: debouncedSearch,
    orderByNameAsc,
    pageIndex,
    pageSize,
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["inventory-items", filters],
    queryFn: () => getInventoryItems(filters),
    retry: false,
  });

  return {
    data,
    isLoading,
    refetch,
    searchValue,
    setSearchValue,
    orderByNameAsc,
    setOrderByNameAsc,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
  };
}
