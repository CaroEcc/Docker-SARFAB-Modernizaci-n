import { getVolunteerTotalDemeritPoint } from "@/api/VolunteerDemeritPoint";
import { useQuery } from "@tanstack/react-query";

export function useVolunteerTotalDemeritPoint(volunteerId?: string | null) {
  return useQuery({
    queryKey: ['volunteerTotalDemeritPointl', volunteerId],
    queryFn: () => getVolunteerTotalDemeritPoint(Number(volunteerId)),
    retry: false
  });
}
