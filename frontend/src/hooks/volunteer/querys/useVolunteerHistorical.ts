import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { getVolunteerHistoricalList } from '@/api/VolunteerAPI';

const DEFAULTS = {
  pageIndex: 1,
  pageSize: 10,
  gradeIdFilter: "",
  defaultDate: '',
  statusFilter: "",
};

interface UseVolunteerOptions {
  initialSearchValue?: string;
  initialgradeIdFilter?: string;
  initialPageIndex?: number;
  initialPageSize?: number;
  initialStartDateValue?: string;
  initialEndDateValue?: string;
  initialStatusFilter?: string;
}

export function useVolunteerHistorical({
  initialSearchValue = "",
  initialgradeIdFilter = DEFAULTS.gradeIdFilter,
  initialPageIndex = DEFAULTS.pageIndex,
  initialPageSize = DEFAULTS.pageSize,
  initialStartDateValue = DEFAULTS.defaultDate,
  initialEndDateValue = DEFAULTS.defaultDate,
  initialStatusFilter = DEFAULTS.statusFilter,
}: UseVolunteerOptions = {}) {

  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [gradeIdFilter, setgradeIdFilter] = useState(initialgradeIdFilter);
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const [startDate, setStartDate] = useState<string | undefined>(initialStartDateValue);
  const [endDate, setEndDate] = useState<string | undefined>(initialEndDateValue);

  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);

  const [debouncedSearch] = useDebounce(searchValue, 500);
  const [debouncedgradeId] = useDebounce(gradeIdFilter, 500);
  const [debouncedStartDate] = useDebounce(startDate, 500);
  const [debouncedEndDate] = useDebounce(endDate, 500);
  const [debouncedStatus] = useDebounce(statusFilter, 500);

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['volunteersHistorical', {
      searchTerm: debouncedSearch, gradeId: debouncedgradeId,
      page: pageIndex, pageSize, startDate: debouncedStartDate, 
      endDate: debouncedEndDate, status: (debouncedStatus ? debouncedStatus : {}),
    }],
    queryFn: () => getVolunteerHistoricalList({
      searchTerm: debouncedSearch, gradeId: debouncedgradeId,
      page: pageIndex, pageSize, startDate: debouncedStartDate, 
      endDate: debouncedEndDate, status: (debouncedStatus ? debouncedStatus : {}),
    }),
    placeholderData: keepPreviousData,
    retry: false,
  });

  return {
    data,
    isLoading,
    isFetching,
    refetch,
    searchValue,
    setSearchValue,
    gradeIdFilter,
    setgradeIdFilter,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,

    setStartDate,
    setEndDate,

    statusFilter,
    setStatusFilter,
  };
}
