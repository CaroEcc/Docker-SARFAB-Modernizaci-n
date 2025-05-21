import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/api/CoursesAPI";
import { Course } from "@/types/courses.schema";

interface GetCoursesParams {
  courseName?: string;
  page?: number;
  pageSize?: number;
}

export function useGetCourses(params?: GetCoursesParams) {
  const { courseName, page = 1, pageSize = 10 } = params || {};
  
  return useQuery<{ data: Course[]; totalPages: number, totalRecords:number }>({
    queryKey: ["courses", courseName, page, pageSize],
    queryFn: () => getCourses(courseName, page, pageSize),
    staleTime: 1000 * 60 * 5, 
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
