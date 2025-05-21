import { medicalCheckupUpdateSchema, MedicalCheckupVolunteerUpdateFormData } from "@/types/volunteerMedicalCheckup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useVolunteerUpdateMedicalCheckupForm(defaultValues: MedicalCheckupVolunteerUpdateFormData) {
  return useForm<MedicalCheckupVolunteerUpdateFormData>({
    resolver: zodResolver(medicalCheckupUpdateSchema),
    defaultValues,
  });
}