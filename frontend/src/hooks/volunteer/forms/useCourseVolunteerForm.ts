import { CourseVolunteer, assignCourseSchema } from "@/types/courseVolunteer.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useCourseVolunteerForm(defaultValues: CourseVolunteer) {
  return useForm<CourseVolunteer>({
    resolver: zodResolver(assignCourseSchema),
    defaultValues,
  });
}
