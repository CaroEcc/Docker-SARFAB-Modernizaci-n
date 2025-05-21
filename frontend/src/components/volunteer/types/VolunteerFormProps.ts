import { UseFormRegister, FieldErrors, Control, UseFormSetValue} from "react-hook-form";
import { Recruit, VolunteerFormData } from "types";

export interface VolunteerFormProps {
    errors:  FieldErrors<VolunteerFormData>;
    register: UseFormRegister<VolunteerFormData>;
    control: Control<VolunteerFormData>;
    recruit ?: Recruit
    setValue ?: UseFormSetValue<VolunteerFormData>;
    grades: any;
}

export interface VolunteerWithRecruitFormProps extends VolunteerFormProps {
    typeVolunteer: string;
}