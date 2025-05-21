import { useQuery } from "@tanstack/react-query";
import { getVolunteerMedicalCheckup } from "@/api/VolunteerMedicalCheckupAPI";

export function useVolunteerMedicalCheckup(initialVolunteerId: string) {
  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ["volunteerMedicalCheckup", initialVolunteerId],
    queryFn: () => getVolunteerMedicalCheckup(Number(initialVolunteerId)),
    retry: false,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
