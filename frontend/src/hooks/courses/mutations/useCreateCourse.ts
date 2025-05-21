import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse } from "@/api/CoursesAPI";
import { CreateCourseForm } from "@/types/courses.schema";
import { toast } from "react-toastify";

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCourseForm) => createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Curso creado correctamente");
    },
    onError: () => toast.error("Ocurrió un error al crear el curso"),
  });
}
