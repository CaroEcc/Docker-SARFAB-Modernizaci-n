import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { getVolunteerGuardsReportList } from '@/api/VolunteerAPI';

const DEFAULTS = {
    pageIndex: 1,
    pageSize: 10,
    statusFilter: "",
    shiftFilter: "",
    defaultDate: '',
};

interface UseVolunteerOptions {
    initialVolunteerId?: number;
    initialSearchValue?: string;
    initialStatusFilter?: string;
    initialShiftFilter?: string;
    initialStartDateValue?: string;
    initialEndDateValue?: string;
    initialPageIndex?: number;
    initialPageSize?: number;
}

export function useVolunteerGuardsReport({
    initialVolunteerId,
    initialSearchValue = "",
    initialStatusFilter = DEFAULTS.statusFilter,
    initialShiftFilter = DEFAULTS.statusFilter,
    initialStartDateValue = DEFAULTS.defaultDate,
    initialEndDateValue = DEFAULTS.defaultDate,
    initialPageIndex = DEFAULTS.pageIndex,
    initialPageSize = DEFAULTS.pageSize
}: UseVolunteerOptions = {}) {

    const [searchValue, setSearchValue] = useState(initialSearchValue);
    const [statusFilter, setStatusFilter] = useState(initialStatusFilter);
    const [shiftFilter, setShiftFilter] = useState(initialShiftFilter);

    const [startDate, setStartDate] = useState<string | undefined>(initialStartDateValue);
    const [endDate, setEndDate] = useState<string | undefined>(initialEndDateValue);

    const [pageIndex, setPageIndex] = useState(initialPageIndex);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const [debouncedSearch] = useDebounce(searchValue, 500);

    const { data, isLoading, refetch, isFetching } = useQuery({
        queryKey: ['volunteerGuardReport', initialVolunteerId, {
            query: debouncedSearch, status: statusFilter, shift: shiftFilter, startDate: startDate,
            endDate: endDate, page: pageIndex, pageSize
        }],
        queryFn: () => getVolunteerGuardsReportList(Number(initialVolunteerId), {
            query: debouncedSearch, status: statusFilter, shift: shiftFilter, startDate: startDate,
            endDate: endDate, page: pageIndex, pageSize
        }),
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

        statusFilter,
        setStatusFilter,

        shiftFilter,
        setShiftFilter,

        startDate,
        setStartDate,
        endDate,
        setEndDate,

        pageIndex,
        setPageIndex,
        pageSize,
        setPageSize
    };
}
