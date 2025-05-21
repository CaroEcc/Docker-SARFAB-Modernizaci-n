import { getRecruitById } from "@/api/RecruitmentAPI";
import { useQuery } from "@tanstack/react-query";

export function useEditRecruit(recruitId?: string | null) {
  return useQuery({
    queryKey: ['editRecruit', recruitId],
    queryFn: () => getRecruitById(Number(recruitId)),
    retry: false,
    staleTime: 0
  });
}
