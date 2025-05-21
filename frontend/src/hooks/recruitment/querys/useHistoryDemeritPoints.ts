import { useQuery } from "@tanstack/react-query";
import { getVolunteerDemeritPointLostPoints } from "@/api/VolunteerDemeritPoint";

interface UseVolunteerCompletedCoursesOptions {
    volunteerId: string;
    initialPageIndex?: number;
    initialPageSize?: number;
}

export function useVolunteerHistoryDemeritPoints({
    volunteerId
}: UseVolunteerCompletedCoursesOptions) {
    const { data, isLoading, refetch, isError, isSuccess } = useQuery({
        queryKey: ["volunteerHistoryDemeritPoints", {volunteerId}],
        queryFn: () => getVolunteerDemeritPointLostPoints(Number(volunteerId)),
        enabled: !!volunteerId,
        retry: false,
    });

    return {
        data,
        isLoading,
        isError,
        refetch,
        volunteerId,
        isSuccess
    };
}
