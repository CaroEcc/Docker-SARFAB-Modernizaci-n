import { EndGuardFormData, endGuardFormData } from "@/types/guard.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useEndGuardForm(defaultValues: Partial<EndGuardFormData>) {
    return useForm<EndGuardFormData>({
        resolver: zodResolver(endGuardFormData),
        defaultValues: defaultValues || {
            guardId: 0,
            observations: '',
            volunteerAttendances: []
        },
    });
}