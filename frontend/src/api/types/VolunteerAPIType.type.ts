import { Volunteer,  VolunteerStatus,  VolunteerUpdateFormData } from "@/types/volunteer.schema"

export type VolunteerAPIType = {
    formData: VolunteerUpdateFormData,
    volunteerId: Volunteer['id']
}

export type VolunteerStatusAPIType = {
    formData: VolunteerStatus,
    volunteerId: Volunteer['id']
}