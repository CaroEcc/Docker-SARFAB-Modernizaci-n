import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { getVolunteerOperationsReportList } from '@/api/VolunteerAPI';

const DEFAULTS = {
    pageIndex: 1,
    pageSize: 10,
    statusFilter: "",
    categoryFilter: "",
    defaultDate: '',
};

interface UseVolunteerOptions {
    initialVolunteerId?: number;
    initialSearchValue?: string;
    initialCategoryFilter?: string;
    initialStartDateValue?: string;
    initialEndDateValue?: string;
    initialPageIndex?: number;
    initialPageSize?: number;
    initialOrderByDateAsc?: boolean;
}

export function useVolunteerOperationsReport({
    initialVolunteerId,
    initialSearchValue = "",
    initialCategoryFilter = DEFAULTS.statusFilter,
    initialStartDateValue = DEFAULTS.defaultDate,
    initialEndDateValue = DEFAULTS.defaultDate,
    initialPageIndex = DEFAULTS.pageIndex,
    initialPageSize = DEFAULTS.pageSize,
    initialOrderByDateAsc = true,
}: UseVolunteerOptions = {}) {

    const [searchValue, setSearchValue] = useState(initialSearchValue);
    const [categoryFilter, setCateforyFilter] = useState(initialCategoryFilter);

    const [startDate, setStartDate] = useState<string | undefined>(initialStartDateValue);
    const [endDate, setEndDate] = useState<string | undefined>(initialEndDateValue);

    const [pageIndex, setPageIndex] = useState(initialPageIndex);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const [debouncedSearch] = useDebounce(searchValue, 500);

    const [orderByDateAsc, setOrderByDateAsc] = useState<boolean>(initialOrderByDateAsc);

    const { data, isLoading, refetch, isFetching } = useQuery({
        queryKey: ['volunteerOperationReport', initialVolunteerId, {
            query: debouncedSearch, categoryId: categoryFilter, startDate: startDate,
            endDate: endDate, page: pageIndex, pageSize, orderByDateAsc
        }],
        queryFn: () => getVolunteerOperationsReportList(Number(initialVolunteerId), {
            query: debouncedSearch, categoryId: categoryFilter, startDate: startDate,
            endDate: endDate, page: pageIndex, pageSize, orderByDateAsc
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

        categoryFilter,
        setCateforyFilter,

        startDate,
        setStartDate,

        endDate,
        setEndDate,

        pageIndex,
        setPageIndex,
        pageSize,
        setPageSize,

        orderByDateAsc,
        setOrderByDateAsc
    };
}
