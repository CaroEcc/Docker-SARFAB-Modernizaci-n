import { GuardFormData, guardCreateFormDataSchema } from "@/types/guard.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useGuardForm(defaultValues: Partial<GuardFormData>) {
    return useForm<GuardFormData>({
        resolver: zodResolver(guardCreateFormDataSchema),
        defaultValues: defaultValues || {
            guardDate: '',
            shiftId: 0,
            responsibleId: 0,
            location: '',
            voluntareeIds: []
        },
    });
}