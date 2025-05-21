import { UseFormRegister, FieldErrors, Control, UseFormSetValue} from "react-hook-form";
import { Recruit, VolunteerData, VolunteerUpdateFormData } from "types";

export interface VolunteerUpdateFormProps {
    errors:  FieldErrors<VolunteerUpdateFormData>;
    register: UseFormRegister<VolunteerUpdateFormData>;
    control: Control<VolunteerUpdateFormData>;
    recruit ?: Recruit
    setValue : UseFormSetValue<VolunteerUpdateFormData>;
    volunteerData: VolunteerData;
}