import { getUsers } from "@/api/UserAPI";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const DEFAULTS = {
    pageIndex: 1,
    pageSize: 10,
    defultStatus: -1,
};

interface UseUserOptions {
    initialSearchValue?: string;
    initialStatusValue?: number;
    initialPageIndex?: number;
    initialPageSize?: number;
}

export function useGetUsers({
    initialSearchValue = "",
    initialStatusValue = DEFAULTS.defultStatus,
    initialPageIndex = DEFAULTS.pageIndex,
    initialPageSize = DEFAULTS.pageSize,
}: UseUserOptions = {}) {

    const [searchValue, setSearchValue] = useState(initialSearchValue);
    const [status, setStatus] = useState(initialStatusValue);
    const [pageIndex, setPageIndex] = useState(initialPageIndex);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const [debouncedSearch] = useDebounce(searchValue, 500);
    const [debouncedStatus] = useDebounce(status, 500);

    const hasFilters = Boolean(searchValue ||  status);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getUsers', {
            query: debouncedSearch,
            ...(debouncedStatus !== -1 && { status: debouncedStatus }),
            page: pageIndex,
            pageSize
        }],
        queryFn: () => {
            const params: Record<string, any> = {
                query: debouncedSearch,
                page: pageIndex,
                pageSize
            };

            if (debouncedStatus !== -1) {
                params.status = debouncedStatus;
            }

            return getUsers(params);
        },
        retry: false,
    });

    return {
        data,
        isLoading,
        refetch,
        searchValue,
        setSearchValue,
        status,
        setStatus,
        pageIndex,
        setPageIndex,
        pageSize,
        setPageSize,
        hasFilters
    };
}