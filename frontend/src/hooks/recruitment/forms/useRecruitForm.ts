import { RecruitmentFormData, recruitmentFormSchema } from "@/types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useRecruitForm(defaultValues: RecruitmentFormData) {
  return useForm<RecruitmentFormData>({
    resolver: zodResolver(recruitmentFormSchema),
    defaultValues,
  });
}
