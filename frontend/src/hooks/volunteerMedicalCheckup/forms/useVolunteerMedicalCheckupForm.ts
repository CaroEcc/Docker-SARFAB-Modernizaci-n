import { MedicalCheckupVolunteerFormData, medicalCheckupVounteerSchemaWithValidation} from "@/types/volunteerMedicalCheckup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useVolunteerMedicalCheckupForm(defaultValues: MedicalCheckupVolunteerFormData) {
  return useForm<MedicalCheckupVolunteerFormData>({
    resolver: zodResolver(medicalCheckupVounteerSchemaWithValidation),
    defaultValues,
  });
}