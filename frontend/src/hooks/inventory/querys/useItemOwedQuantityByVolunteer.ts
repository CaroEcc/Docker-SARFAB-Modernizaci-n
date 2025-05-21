import { useQuery } from "@tanstack/react-query";
import { getItemsOwedByVolunteer } from "@/api/InventoryAPI";

export function useItemOwedQuantityByVolunteer(
  volunteerId: number, 
  itemId: number, 
  options = {}
) {
  return useQuery<number>({
    queryKey: ["itemOwedQuantityByVolunteer", volunteerId, itemId],
    queryFn: async () => {
      if (!volunteerId || !itemId) return 0;
      const items = await getItemsOwedByVolunteer(volunteerId);
      const item = items.find(i => i.itemId === itemId);
      return item ? item.quantity : 0;
    },
    enabled: !!volunteerId && !!itemId,
    ...options
  });
}
