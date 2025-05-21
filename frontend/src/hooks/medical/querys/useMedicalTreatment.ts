import { getMedicalTreatment } from "@/api/MedicalTreatmentAPI";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const DEFAULTS = {
    pageIndex: 1,
    pageSize: 10,
    defaultDate: ''
};

interface UseMedicalTreatmentOptions {
    initialSearchValue?: string;
    initialStartDateValue?: string;
    initialEndDateValue?: string;
    initialPageIndex?: number;
    initialPageSize?: number;
}

export function useMedicalTreatment({
    initialSearchValue = "",
    initialStartDateValue = DEFAULTS.defaultDate,
    initialEndDateValue = DEFAULTS.defaultDate,
    initialPageIndex = DEFAULTS.pageIndex,
    initialPageSize = DEFAULTS.pageSize,
}: UseMedicalTreatmentOptions = {}) {

    const [searchValue, setSearchValue] = useState(initialSearchValue);
    const [startDate, setStartDate] = useState<string | undefined>(initialStartDateValue);
    const [endDate, setEndDate] = useState<string | undefined>(initialEndDateValue);
    const [pageIndex, setPageIndex] = useState(initialPageIndex);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const [debouncedSearch] = useDebounce(searchValue, 500);
    const [debouncedStartDate] = useDebounce(startDate, 500);
    const [debouncedEndDate] = useDebounce(endDate, 500);

    const hasFilters = Boolean(searchValue || startDate || endDate);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['medicalTreatment', { query: debouncedSearch, startDate: debouncedStartDate, endDate: debouncedEndDate, page: pageIndex, pageSize }],
        queryFn: () => getMedicalTreatment({ query: debouncedSearch, startDate: debouncedStartDate, endDate: debouncedEndDate, page: pageIndex, pageSize }),
        retry: false,
    });

    return {
        data,
        isLoading,
        refetch,
        searchValue,
        setSearchValue,
        setStartDate,
        setEndDate,
        pageIndex,
        setPageIndex,
        pageSize,
        setPageSize,
        hasFilters
    };
}