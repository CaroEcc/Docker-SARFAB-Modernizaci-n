import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCourseForm, UpdateCourseForm, createCourseSchema } from "@/types/courses.schema";
import { useCreateCourse } from "./mutations/useCreateCourse";
import { useUpdateCourse } from "./mutations/useUpdateCourse";

interface UseCourseFormLogicProps {
  isOpen: boolean;
  courseId?: number;
  courseData?: { name: string; description: string };
  onClose: () => void;
}

export function useCourseFormLogic({
  isOpen,
  courseId,
  courseData,
  onClose,
}: UseCourseFormLogicProps) {
  const [isLoading, setIsLoading] = useState(false);
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();

  const form = useForm<CreateCourseForm>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: { 
      name: "",
      description: ""
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (isOpen) {
      if (courseId && courseData) {
        reset({ 
          name: courseData.name,
          description: courseData.description
        });
      } else {
        reset({ name: "", description: "" });
      }
    }
  }, [isOpen, courseId, courseData, reset]);

  const handleFormSubmit = async (data: CreateCourseForm) => {
    try {
      setIsLoading(true);
      if (courseId) {
        await updateCourse.mutateAsync({
          id: courseId,
          formData: data as UpdateCourseForm,
        });
      } else {
        await createCourse.mutateAsync(data);
      }
      onClose();
    } catch (error) {
      console.error("Error al guardar el curso:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleFormSubmit,
    formProps: {
      form,
    }
  };
}
