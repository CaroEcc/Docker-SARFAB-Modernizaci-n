import { useQuery } from "@tanstack/react-query";
import { getVolunteerPendingReturns } from "@/api/InventoryAPI";

export function usePendingReturnsByItemId(itemId: number, enabled = true) {
  return useQuery({
    queryKey: ["pending-returns", itemId],
    queryFn: () => getVolunteerPendingReturns(itemId),
    enabled: !!itemId && enabled,
  });
}
