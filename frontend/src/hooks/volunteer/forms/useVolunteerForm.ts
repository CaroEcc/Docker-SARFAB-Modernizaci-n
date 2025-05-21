import { VolunteerFormData, volunteerFormSchema } from "@/types/volunteer.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useVolunteerForm(defaultValues: VolunteerFormData) {
  return useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues,
  });
}
