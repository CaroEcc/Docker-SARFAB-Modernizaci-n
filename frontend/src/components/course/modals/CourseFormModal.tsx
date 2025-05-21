import { useCourseFormLogic } from "@/hooks/courses/useCourseFormLogic";
import Modal from "@/components/common/Modal/Modal";
import { CourseForm } from "../forms/CourseForm";
import Loader from "@/components/common/Loader";

interface CourseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId?: number;
  courseData?: { name: string; description: string };
}

export function CourseFormModal({
  isOpen,
  onClose,
  courseId,
  courseData,
}: CourseFormModalProps) {
  const { 
    isLoading, 
    handleFormSubmit, 
    formProps
  } = useCourseFormLogic({
    isOpen,
    courseId,
    courseData,
    onClose,
  });

  return (
    <Modal
      key={courseId}
      title={
        courseId
          ? "Editar curso"
          : "Registrar curso"
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      {isLoading && !formProps.form ? (
        <Loader message={`Cargando datos previos para ${courseId ? 'edición' : 'registro'} de curso`} />
      ) : (
        <CourseForm
          {...formProps}
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
          onClose={onClose}
          courseId={courseId}
        />
      )}
    </Modal>
  );
}
