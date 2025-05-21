import { getMedicalCheckupById } from "@/api/VolunteerMedicalCheckupAPI";
import { useQuery } from "@tanstack/react-query";

export function useEditVolunteerMedicalCheckup(medicalCheckupId?: number | null) {
  return useQuery({
    queryKey: ['editVolunteerMedicalCheckup', medicalCheckupId],
    queryFn: () => getMedicalCheckupById(Number(medicalCheckupId)),
    retry: false,
    enabled: Boolean(medicalCheckupId),
  });
}
