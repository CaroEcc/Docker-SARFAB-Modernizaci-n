import { GuardFormData, ShiftList, VoluntareeGuard } from "@/types/guard.schema";
import { VolunteerWithRankList } from "@/types/operationContext.schema";
import { Control, FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

export interface GuardEditFormProps {
    setVoluntaries: (value: VoluntareeGuard[]) => void;
    voluntaries: VoluntareeGuard[];
    volunteersData: VolunteerWithRankList | undefined;
    shiftData: ShiftList | undefined;
    errors: FieldErrors<GuardFormData>;
    register: UseFormRegister<GuardFormData>;
    control: Control<GuardFormData>;
    watch: UseFormWatch<GuardFormData>
    readonly?: boolean;
}