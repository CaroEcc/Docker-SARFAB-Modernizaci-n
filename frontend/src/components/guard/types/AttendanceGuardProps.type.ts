import { EndGuardFormData, Guard, VolunteerAttendance } from "@/types/guard.schema";
import { FieldErrors } from "react-hook-form";

export interface AttendanceGuardProps {
    data: Guard | undefined,
    volunteerAttendances: VolunteerAttendance[];
    setVolunteerAttendances: (value: VolunteerAttendance[]) => void,
    errors: FieldErrors<EndGuardFormData>;
}