import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "@/api/InventoryAPI";

export function useAllItems({ enabled = true }: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: ["all-items"],
    queryFn: getAllItems,
    enabled,
  });
}
