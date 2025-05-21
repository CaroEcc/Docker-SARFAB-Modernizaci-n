import { useCallback, useState } from "react";
import { VolunteerUpdateFormData } from "@/types/index";
import { SubmitHandler } from "react-hook-form";
import { useVolunteerFormState } from "./forms/useVolunteerFormState";
import { useUpdateVolunteer } from "./mutations/useUpdateVolunteer";

export function useDetailsVolunteerForm(data: VolunteerUpdateFormData, volunteerId: number) {
    const { register, handleSubmit, formState: { errors }, control, setValue } = useVolunteerFormState(data);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { mutate } = useUpdateVolunteer();

    const updateVolunteer = useCallback(
        (formData: VolunteerUpdateFormData) => {
            setIsSubmitting(true);
            mutate({ formData, volunteerId }, { onSettled: () => setIsSubmitting(false) });
        },
        [mutate, volunteerId]
    );

    const onSubmit: SubmitHandler<VolunteerUpdateFormData> = (formData) => {
        updateVolunteer(formData);
    };

    return { 
        register, 
        handleSubmit, 
        errors, 
        control, 
        isSubmitting, 
        handleForm: onSubmit,
        setValue
    };
}