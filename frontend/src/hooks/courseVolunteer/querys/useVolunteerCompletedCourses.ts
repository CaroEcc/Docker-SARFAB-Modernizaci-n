import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVolunteerCompletedCourses } from "@/api/CourseVolunteerAPI";

const DEFAULTS = {
    pageIndex: 1,
    pageSize: 10
};

interface UseVolunteerCompletedCoursesOptions {
    volunteerId: string;
    initialPageIndex?: number;
    initialPageSize?: number;
}

export function useVolunteerCompletedCourses({
    volunteerId,
    initialPageIndex = DEFAULTS.pageIndex,
    initialPageSize = DEFAULTS.pageSize
}: UseVolunteerCompletedCoursesOptions) {

    const [pageIndex, setPageIndex] = useState(initialPageIndex);
    const [pageSize, setPageSize] = useState(initialPageSize);
  
    const { data, isLoading, refetch, isError, error, isFetching } = useQuery({
        queryKey: ["volunteerCompletedCourses", {volunteerId, page: pageIndex, pageSize,}],
        queryFn: () => getVolunteerCompletedCourses(Number(volunteerId), {page: pageIndex, pageSize}),
        enabled: !!volunteerId,
        retry: false,
    });

    return {
        data,
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
        volunteerId,

        pageIndex,
        setPageIndex,
        pageSize,
        setPageSize,
    };
}
