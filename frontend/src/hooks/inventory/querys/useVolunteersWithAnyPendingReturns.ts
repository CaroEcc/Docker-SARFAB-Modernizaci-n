import { useQuery } from "@tanstack/react-query";
import { getVolunteersWithAnyPendingReturns } from "@/api/InventoryAPI";
import { VolunteerWithPending } from "@/types/invetory.schema";

export function useVolunteersWithAnyPendingReturns() {
  return useQuery<VolunteerWithPending[]>({
    queryKey: ["volunteersWithAnyPendingReturns"],
    queryFn: getVolunteersWithAnyPendingReturns,
  });
}
