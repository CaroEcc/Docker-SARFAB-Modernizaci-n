import { getCoursesSelect } from "@/api/CoursesAPI";
import { Volunteer } from "@/types/volunteer.schema";
import { useQuery } from "@tanstack/react-query";

export const useCoursesSelect = (volunteerId: Volunteer['id']) => {
    return useQuery({
        queryKey: ["coursesSelect", volunteerId],
        queryFn: () => getCoursesSelect(volunteerId),
        enabled: !!volunteerId
    });
};