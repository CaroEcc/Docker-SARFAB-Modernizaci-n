import { useCallback, useState,useRef, useEffect } from "react";
import { useUpdateRecruit } from "./mutations/useUpdateRecruit";
import { RecruitmentFormData } from "@/types/index";
import { useRecruitFormState } from "./forms/useRecruitFormState";
import { SubmitHandler } from "react-hook-form";

export function useEditRecruitForm(data: RecruitmentFormData, recruitId: number) {
    const { register, handleSubmit, formState: { errors }, control } = useRecruitFormState(data);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { mutate } = useUpdateRecruit();
  const isMounted = useRef(true);

  useEffect(() => {
    return () => { isMounted.current = false; };
}, []);

const updateRecruit = useCallback(
  (formData: RecruitmentFormData) => {
      setIsSubmitting(true);
      mutate({ formData, recruitId }, { 
          onSettled: () => {
              if (isMounted.current) {
                  setIsSubmitting(false);
              }
          } 
      });
  },
  [mutate, recruitId]
);

    const onSubmit: SubmitHandler<RecruitmentFormData> = (formData) => {
        updateRecruit(formData);
    };

    return { 
        register, 
        handleSubmit, 
        errors, 
        control, 
        isSubmitting, 
        handleForm: onSubmit
    };
}