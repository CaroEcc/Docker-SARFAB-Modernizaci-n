import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useGetCourseById } from "@/hooks/courses/querys/useGetCourseById";
import { useParams } from "react-router-dom";
import CourseDetailComponent from "@/components/course/CourseDetailComponent";
import Loader from "@/components/common/Loader";

export default function CourseDetailView() {
  useBreadcrumb([
    { label: 'Cursos', path: '/courses/list' },
    { label: 'Detalle del curso' },
  ]);

  const { courseId } = useParams<{ courseId: string }>();
  const courseIdNumber = Number(courseId);

  const { data: course, isLoading: isLoadingCourse } = useGetCourseById(courseIdNumber);
  return isLoadingCourse ? (
    <Loader message="Cargando datos del curso" />
  ) : (
    <div className="container mx-auto p-4">
      <CourseDetailComponent course={course!} />
    </div>
  );
}