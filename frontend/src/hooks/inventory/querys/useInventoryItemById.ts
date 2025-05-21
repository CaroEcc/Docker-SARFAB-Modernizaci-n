import { useQuery } from "@tanstack/react-query";
import { getInventoryItems } from "@/api/InventoryAPI";
import { InventoryItem } from "@/types/invetory.schema";

export function useInventoryItemById(itemId: number) {
  return useQuery<InventoryItem | undefined>({
    queryKey: ["inventory-item-detail", itemId],
    queryFn: async () => {
      const result = await getInventoryItems();
      return result.data.find(item => item.itemId === itemId);
    },
    enabled: !!itemId
  });
}
