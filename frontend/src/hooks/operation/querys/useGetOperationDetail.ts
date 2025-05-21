import { useQuery } from "@tanstack/react-query";
import { getOperationById } from "@/api/OperationAPI";
import { OperationDetailResponse } from "@/types/operation.schema";

export function useGetOperationDetail(id?: number) {
  return useQuery<OperationDetailResponse>({
    queryKey: ["operationDetail", id ?? null],
    queryFn: () => getOperationById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
