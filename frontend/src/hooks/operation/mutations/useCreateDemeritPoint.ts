import { useMutation } from "@tanstack/react-query";
import { CreateDemeritPoint } from "@/api/DemeritPointAPI";
import { DemeritPoint } from "@/types/demeritPoint.schema";

export function useCreateDemeritPoint() {
  return useMutation({
    mutationFn: async (data: DemeritPoint) => await CreateDemeritPoint(data),
  });
}
