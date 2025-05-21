import { getVolunteerById } from "@/api/VolunteerAPI";
import { useQuery } from "@tanstack/react-query";

export function useDetailsVolunteer(volunteerId?: string | null) {
  return useQuery({
    queryKey: ['editVolunteer', volunteerId],
    queryFn: () => getVolunteerById(Number(volunteerId)),
    retry: false
  });
}
