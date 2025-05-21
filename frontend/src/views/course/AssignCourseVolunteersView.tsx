import Loader from "@/components/common/Loader";
import AssignCourseVolunteersComponent from "@/components/course/AssignCourseVolunteersComponent";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useGetCourseById } from "@/hooks/courses/querys/useGetCourseById";
import { useGetVolunteersWithoutCourse } from "@/hooks/courseVolunteer/querys/useGetVolunteersWithoutCourse";
import { useParams } from "react-router-dom";

export default function AssignCourseVolunteersView() {
  useBreadcrumb([
    { label: 'Cursos', path: '/courses/list' },
    { label: 'Asignar voluntarios' },
  ]);

  const { courseId } = useParams<{ courseId: string }>();
  const courseIdNumber = Number(courseId);

  const { data: course, isLoading: isLoadingCourse, error: courseError } = useGetCourseById(courseIdNumber);
  const { data: volunteers, isLoading: isLoadingVolunteers, error: volunteersError } = useGetVolunteersWithoutCourse(courseIdNumber);

  const isLoading = isLoadingCourse || isLoadingVolunteers;
  const hasError = courseError || volunteersError || !course || !volunteers;

  if (isLoading) {
    return <Loader message="Cargando datos del curso" />;
  }

  if (hasError) {
    return <Loader message="Error al cargar los datos del curso" />;
  }

  return (
    <div className="container mx-auto p-4">
      <AssignCourseVolunteersComponent course={course} volunteersWithoutCourse={volunteers} />
    </div>
  );
}