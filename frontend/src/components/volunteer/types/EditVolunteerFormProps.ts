import { Volunteer, VolunteerData } from "@/types/index"

export interface EditVolunteerFormProps {
    data: VolunteerData;
    volunteerId: Volunteer['id']
}