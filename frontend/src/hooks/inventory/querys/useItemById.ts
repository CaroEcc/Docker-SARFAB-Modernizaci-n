import { useQuery } from "@tanstack/react-query";
import { getItemById } from "@/api/InventoryAPI";
import { Item } from "@/types/invetory.schema";

export function useItemById(itemId: number) {
  return useQuery<Item>({
    queryKey: ["item", itemId],
    queryFn: () => getItemById(itemId),
    enabled: !!itemId,
  });
}
