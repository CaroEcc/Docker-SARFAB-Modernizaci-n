import { useQuery } from "@tanstack/react-query";
import { getOperationContext } from "@/api/OperationContextAPI";
import { OperationContext } from "@/types/operationContext.schema";

export function useOperationContext() {
  return useQuery<OperationContext>({
    queryKey: ["operationContext"],
    queryFn: getOperationContext,
  });
}
