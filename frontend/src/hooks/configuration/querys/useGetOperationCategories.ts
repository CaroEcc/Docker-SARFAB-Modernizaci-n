import { getOperationCategories } from "@/api/OperationContextAPI";
import { useQuery } from "@tanstack/react-query";
import { OperationCategory } from "@/types/operationContext.schema";

export function useGetOperationCategories() {
  return useQuery<OperationCategory[]>({
    queryKey: ["operationCategories"],
    queryFn: () => getOperationCategories(),
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}