import { RiAddLine } from "@remixicon/react";

interface CourseHeaderProps {
    onOpenCourseModal: () => void;
}

export function CourseHeader({ onOpenCourseModal }: CourseHeaderProps) {
    return (
        <div className="flex justify-between items-center mb-4">
            <button 
                onClick={onOpenCourseModal}
                className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-10 text-white hover:bg-opacity-90"
            >
                <RiAddLine className='me-2' /> Registrar curso
            </button>
        </div>
    );
}
