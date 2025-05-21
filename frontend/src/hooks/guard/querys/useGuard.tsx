import { getGuards } from "@/api/GuardAPI";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const DEFAULTS = {
    pageIndex: 1,
    pageSize: 10,
    defaultDate: '',
    defultStatus: 1,
    defaultShift: -1
};

interface UseGuardOptions {
    initialSearchValue?: string;
    initialStartDateValue?: string;
    initialEndDateValue?: string;
    initialStatusValue?: number;
    initialShiftValue?: number;
    initialPageIndex?: number;
    initialPageSize?: number;
}

export function useGuard({
    initialSearchValue = "",
    initialStartDateValue = DEFAULTS.defaultDate,
    initialEndDateValue = DEFAULTS.defaultDate,
    initialShiftValue = DEFAULTS.defaultShift,
    initialStatusValue = DEFAULTS.defultStatus,
    initialPageIndex = DEFAULTS.pageIndex,
    initialPageSize = DEFAULTS.pageSize,
}: UseGuardOptions = {}) {

    const [searchValue, setSearchValue] = useState(initialSearchValue);
    const [status, setStatus] = useState(initialStatusValue);
    const [shift, setShift] = useState(initialShiftValue);
    const [startDate, setStartDate] = useState<string | undefined>(initialStartDateValue);
    const [endDate, setEndDate] = useState<string | undefined>(initialEndDateValue);
    const [pageIndex, setPageIndex] = useState(initialPageIndex);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const [debouncedSearch] = useDebounce(searchValue, 500);
    const [debouncedStartDate] = useDebounce(startDate, 500);
    const [debouncedEndDate] = useDebounce(endDate, 500);
    const [debouncedStatus] = useDebounce(status, 500);
    const [debouncedShift] = useDebounce(shift, 500);


    const { data, isLoading, refetch } = useQuery({
        queryKey: ['guard', {
            query: debouncedSearch,
            startDate: debouncedStartDate,
            endDate: debouncedEndDate,
            ...(debouncedStatus !== -1 && { status: debouncedStatus }),
            ...(debouncedShift !== -1 && { shift: debouncedShift }),
            page: pageIndex,
            pageSize
        }],
        queryFn: () => {
            const params: Record<string, any> = {
                query: debouncedSearch,
                startDate: debouncedStartDate,
                endDate: debouncedEndDate,
                page: pageIndex,
                pageSize
            };

            if (debouncedStatus !== -1) {
                params.status = debouncedStatus;
            }

            if (debouncedShift !== -1) {
                params.shift = debouncedShift;
            }

            return getGuards(params);
        },
        retry: false,
    });

    const hasFilters = Boolean(searchValue || shift || status || startDate || endDate);

    return {
        data,
        isLoading,
        refetch,
        searchValue,
        setSearchValue,
        status,
        setStatus,
        shift,
        setShift,
        setStartDate,
        setEndDate,
        pageIndex,
        setPageIndex,
        pageSize,
        setPageSize,
        hasFilters
    };
}