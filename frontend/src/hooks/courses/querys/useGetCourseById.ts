import { useQuery } from "@tanstack/react-query";
import { getCourseById } from "@/api/CoursesAPI";
import { CourseDetail } from "@/types/courses.schema";

export function useGetCourseById(id: number | undefined) {
  return useQuery<CourseDetail | null>({
    queryKey: ["course", id],
    queryFn: () => {
      if (id === undefined) return null;
      return getCourseById(id);
    },
    enabled: id !== undefined,
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
