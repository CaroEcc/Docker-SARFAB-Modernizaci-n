import { getMilitaryById } from "@/api/MilitaryAPI";
import { useQuery } from "@tanstack/react-query";
import { Military } from "@/types/index";

export function useMilitaryById(militaryId?: number) {
  return useQuery<Military | null>({
    queryKey: ["viewMilitary", militaryId],
    queryFn: () => getMilitaryById(militaryId!),
    enabled: !!militaryId,
  });
}

