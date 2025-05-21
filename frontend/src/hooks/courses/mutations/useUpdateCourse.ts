import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourse } from "@/api/CoursesAPI";
import { UpdateCourseForm } from "@/types/courses.schema";
import { toast } from "react-toastify";

interface UpdateCourseParams {
  id: number;
  formData: UpdateCourseForm;
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: UpdateCourseParams) => 
      updateCourse(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Curso actualizado correctamente");
    },
    onError: () => toast.error("Ocurrió un error al actualizar el curso"),
  });
}
