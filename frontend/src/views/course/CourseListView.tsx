import { useState } from "react";
import { CourseListViewComponent } from "@/components/course/CourseListViewComponent";
import { courseColumnsDef } from "@/constants/courses/CourseColumnsDef";
import { CourseFormModal } from "@/components/course/modals/CourseFormModal";

export default function CourseListView() {
    const [courseModalOpen, setCourseModalOpen] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState<number | undefined>(undefined);
    const [selectedCourseData, setSelectedCourseData] = useState<{ name: string; description: string } | undefined>(undefined);

    const openCourseModal = () => {
        setSelectedCourseId(undefined);
        setSelectedCourseData(undefined);
        setCourseModalOpen(true);
    };

    const openEditCourseModal = (courseId: number, courseData: { name: string; description: string }) => {
        setSelectedCourseData(courseData);
        setSelectedCourseId(courseId);
        setCourseModalOpen(true);
    };

    const closeCourseModal = () => {
        setCourseModalOpen(false);
        setSelectedCourseId(undefined);
        setSelectedCourseData(undefined);
    };

    return (
        <CourseListViewComponent
            breadcrumb={[{ label: "Cursos", path: "/courses/list" }, { label: "Listado de cursos" }]}
            columns={courseColumnsDef(openEditCourseModal)}
            onOpenCourseModal={openCourseModal}
            modalComponent={
                <CourseFormModal
                    isOpen={courseModalOpen}
                    onClose={closeCourseModal}
                    courseId={selectedCourseId}
                    courseData={selectedCourseData}
                />
            }
        />
    );
}