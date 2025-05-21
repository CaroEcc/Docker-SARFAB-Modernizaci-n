import { GetmarkOperationAbsenceInfo } from "@/api/OperationAPI";
import { AbsenceMarkResponse } from "@/types/operation.schema";
import { useQuery } from "@tanstack/react-query";

export function useGetOperationAbsence(id?: number) {
  return useQuery<AbsenceMarkResponse>({
    queryKey: ["operationAbsence", id ?? null],
    queryFn: () => GetmarkOperationAbsenceInfo(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}