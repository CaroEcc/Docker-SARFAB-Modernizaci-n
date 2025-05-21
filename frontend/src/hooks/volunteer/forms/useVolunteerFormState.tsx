import { VolunteerUpdateFormData } from "@/types/volunteer.schema";
import { useVolunteerUpdateForm } from "./useVolunteerUpdateForm";
import { UseFormReturn } from "react-hook-form";

export function useVolunteerFormState(data: VolunteerUpdateFormData): UseFormReturn<VolunteerUpdateFormData> {
    return useVolunteerUpdateForm({
        firstName: data.firstName,
        lastName: data.lastName,
        ci: data.ci,
        birthDate: data.birthDate,
        homeAddress: data.homeAddress,
        phone: data.phone,
        mobilePhone: data.mobilePhone,
        email: data.email,
        distinctiveFeatures: data.distinctiveFeatures,
        volunteerType: data.volunteerType,
        occupation: data.occupation,
        bloodType: data.bloodType,
        religion: data.religion,
        allergies: data.allergies,
        emergencyContactFullName: data.emergencyContactFullName,
        emergencyContactRelation: data.emergencyContactRelation,
        emergencyContactAddress: data.emergencyContactAddress,
        emergencyContactPhone: data.emergencyContactPhone,
        emergencyContactMobile: data.emergencyContactMobile,
        departmentId: data.departmentId,
        gradeId: data.gradeId,
    });
}