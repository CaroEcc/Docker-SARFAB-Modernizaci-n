import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUpdateStatusPersonOperation } from "./useUpdateStatusPersonOperation";
import { useCreateDemeritPoint } from "./useCreateDemeritPoint";
import { UpdatePersonStatusForm } from "@/types/operation.schema";
import { DemeritPoint } from "@/types/demeritPoint.schema";
import { toast } from "react-toastify";

type AttendanceEntry = {
  statusData: UpdatePersonStatusForm;
  demeritData?: DemeritPoint;
};

export function useRegisterDemeritAndUpdateStatus() {
  const { mutateAsync: createDemerit } = useCreateDemeritPoint();
  const { mutateAsync: updateStatus } = useUpdateStatusPersonOperation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AttendanceEntry[]) => {
      try {
        await Promise.all([
          ...data.map(entry => updateStatus(entry.statusData)),
          ...data
            .filter(entry => entry.demeritData)
            .map(entry => createDemerit(entry.demeritData!)),
        ]);
      } catch (error) {
        console.error("❌ Error al aplicar cambios de asistencia:", error);
        throw new Error("Error al registrar asistencias e inasistencias");
      }
    },
    onSuccess: async () => {
      toast.success("Asistencias e inasistencias registradas correctamente");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["operationAbsence"] }),
        queryClient.invalidateQueries({ queryKey: ["demeritPoints"] }),
      ]);
    },
    onError: () => {
      toast.error("Ocurrió un error al registrar las asistencias");
    },
  });
}
