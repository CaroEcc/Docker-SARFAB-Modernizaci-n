import { useQuery } from "@tanstack/react-query";
import { getItemsOwedByVolunteer } from "@/api/InventoryAPI";
import { Item } from "@/types/invetory.schema";

export function useItemsOwedByVolunteer(volunteerId: number) {
  return useQuery<Item[]>({
    queryKey: ["itemsOwedByVolunteer", volunteerId],
    queryFn: () => getItemsOwedByVolunteer(volunteerId),
    enabled: !!volunteerId,
  });
}
