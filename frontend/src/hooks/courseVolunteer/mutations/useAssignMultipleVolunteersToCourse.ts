import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { assignMultipleVolunteersToCourse } from "@/api/CoursesAPI";
import { AssignMultipleVolunteersToCourseForm } from "@/types/courses.schema";

export function useAssignMultipleVolunteersToCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AssignMultipleVolunteersToCourseForm) => {
      return assignMultipleVolunteersToCourse(data);
    },
    onSuccess: (_, variables) => {
      toast.success("Voluntarios asignados correctamente");
      
      queryClient.invalidateQueries({
        queryKey: ["course", variables.courseId],
      });
      
      queryClient.invalidateQueries({
        queryKey: ["volunteersWithoutCourse", variables.courseId],
      });
    },
    onError: (error: Error) => {
      toast.error(`Error al asignar voluntarios: ${error.message}`);
    },
  });
}
