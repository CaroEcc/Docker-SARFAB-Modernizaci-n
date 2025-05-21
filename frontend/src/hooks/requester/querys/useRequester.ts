import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { getRequesters } from '@/api/RequesterAPI';
import { keepPreviousData } from '@tanstack/react-query';

const DEFAULTS = {
  pageIndex: 1, 
  pageSize: 10,
};

interface UseRequesterOptions {
  initialSearchValue?: string;
  initialPageIndex?: number;
  initialPageSize?: number;
}

export function useRequester({
  initialSearchValue = "",
  initialPageIndex = DEFAULTS.pageIndex,
  initialPageSize = DEFAULTS.pageSize,
}: UseRequesterOptions = {}) {

  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [isSearching, setIsSearching] = useState(false);

  const [debouncedSearch] = useDebounce(searchValue, 500);

  useEffect(() => {
    setIsSearching(true);
  }, [debouncedSearch, pageIndex, pageSize]);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['requesters', { searchTerm: debouncedSearch, page: pageIndex, pageSize }],
    queryFn: () => getRequesters(debouncedSearch, pageIndex, pageSize),
    placeholderData: keepPreviousData,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setIsSearching(false);
    }
  }, [isLoading, isFetching]);

  const isLoadingData = isLoading || isFetching || isSearching;

  return {
    data,
    isLoading: isLoadingData, 
    refetch,
    searchValue,
    setSearchValue,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
  };
}
