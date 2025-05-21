import { useQuery } from "@tanstack/react-query";
import { getVolunteersWithGrade } from "@/api/OperationContextAPI";

export function useVolunteersWithRank({ enabled = true }: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: ["volunteers-with-rank"],
    queryFn: getVolunteersWithGrade,
    enabled,
  });
}
