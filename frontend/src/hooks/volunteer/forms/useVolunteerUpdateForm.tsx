import { VolunteerUpdateFormData, volunteerUpdateFormSchema } from "@/types/volunteer.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useVolunteerUpdateForm(defaultValues: VolunteerUpdateFormData) {
  return useForm<VolunteerUpdateFormData>({
    resolver: zodResolver(volunteerUpdateFormSchema),
    defaultValues,
  });
}
