import { getRecruitById } from "@/api/RecruitmentAPI";
import { useQuery } from "@tanstack/react-query";

export function useRecruitData(recruitId?: string | null) {
  return useQuery({
    queryKey: ['viewRecruit', recruitId],
    queryFn: () => getRecruitById(Number(recruitId)),
    enabled: !!recruitId,
  });
}
