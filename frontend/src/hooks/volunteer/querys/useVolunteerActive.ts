import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { getVolunteerActiveList } from '@/api/VolunteerAPI';

const DEFAULTS = {
  pageIndex: 1,
  pageSize: 10,
  gradeIdFilter: "",
};

interface UseVolunteerOptions {
  initialSearchValue?: string;
  initialgradeIdFilter?: string;
  initialPageIndex?: number;
  initialPageSize?: number;
  initialOrderByLastNameAsc?: boolean;
}

export function useVolunteerActive({
  initialSearchValue = "",
  initialgradeIdFilter = DEFAULTS.gradeIdFilter,
  initialPageIndex = DEFAULTS.pageIndex,
  initialPageSize = DEFAULTS.pageSize,
  initialOrderByLastNameAsc = true,
}: UseVolunteerOptions = {}) {

  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [gradeIdFilter, setgradeIdFilter] = useState(initialgradeIdFilter);
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const [orderByLastNameAsc, setOrderByLastNameAsc] = useState<boolean>(initialOrderByLastNameAsc);

  const [debouncedSearch] = useDebounce(searchValue, 500);

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['volunteersActive', { searchTerm: debouncedSearch, gradeId: gradeIdFilter, page: pageIndex, pageSize, orderByLastNameAsc }],
    queryFn: () => getVolunteerActiveList({ searchTerm: debouncedSearch, gradeId: gradeIdFilter, page: pageIndex, pageSize, orderByLastNameAsc }),
    placeholderData: keepPreviousData,
    retry: false,
  });

  return {
    data,
    isLoading,
    refetch,
    isFetching,
    searchValue,
    setSearchValue,
    gradeIdFilter,
    setgradeIdFilter,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,

    orderByLastNameAsc,
    setOrderByLastNameAsc
  };
}
