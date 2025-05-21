import { UseFormReturn } from "react-hook-form";
import FormInput from "@/components/common/FormInput/FormInput";
import FormTextArea from "@/components/common/FormTextArea/FormTextArea";
import ErrorFormMessage from "@/components/common/ErrorFormMessage/ErrorFormMessage";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import { CreateCourseForm } from "@/types/courses.schema";

interface CourseFormProps {
  form: UseFormReturn<CreateCourseForm>;
  onSubmit: (data: CreateCourseForm) => void;
  isLoading: boolean;
  onClose: () => void;
  courseId?: number;
}

export function CourseForm({
  form,
  onSubmit,
  isLoading,
  onClose,
  courseId,
}: CourseFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
      <fieldset disabled={isLoading}>
        <div>
          <FormInput
            label="Nombre del curso"
            name="name"
            register={register}
            placeholder="Ingrese el nombre del curso"
          />
          {errors.name && (
            <ErrorFormMessage>{errors.name.message as string}</ErrorFormMessage>
          )}
        </div>

        <div className="mt-4">
          <FormTextArea
            label="Descripción"
            name="description"
            register={register}
            placeholder="Ingrese la descripción del curso"
          />
          {errors.description && (
            <ErrorFormMessage>{errors.description.message as string}</ErrorFormMessage>
          )}
        </div>
      </fieldset>

      <div className="pt-6">
        <ButtonGroup
          buttons={[
            {
              type: "button",
              label: "Cancelar",
              onClick: onClose,
              variant: "secondary",
              disabled: isLoading,
            },
            {
              type: "button",
              label: courseId ? "Actualizar" : "Registrar",
              onClick: handleSubmit(onSubmit),
              variant: "primary",
              isLoading: isLoading,
            },
          ]}
        />
      </div>
    </form>
  );
}
