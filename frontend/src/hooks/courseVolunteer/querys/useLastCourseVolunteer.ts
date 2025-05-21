import { getLastCourseVolunteer } from "@/api/CourseVolunteerAPI";
import { useQuery } from "@tanstack/react-query";

export function useLastCourseVolunteer(id: number) {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["lastCourseVolunteer", id],
        queryFn: async () => {
            if (id === undefined) {
                return null;
            }
            return getLastCourseVolunteer(id);
        },
        enabled: id !== undefined,
        retry: false,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    });

    return { data, isLoading, isError, error };
}