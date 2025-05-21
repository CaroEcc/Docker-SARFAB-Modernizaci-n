import { getGuardById } from "@/api/GuardAPI";
import { useQuery } from "@tanstack/react-query";

export function useGetGuard(guardId: number) {
    return useQuery({
        queryKey: ['guardId', guardId],
        queryFn: () => getGuardById(guardId),
        retry: false
    });
}