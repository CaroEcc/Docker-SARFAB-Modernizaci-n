import { useEffect, useState } from "react";
import { Course } from "@/types/courses.schema";
import Modal from "@/components/common/Modal/Modal";

export const DetailsCourseModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [courseDetails, setCourseDetails] = useState<Course | null>(null);
    
    // Escuchar clicks en botones de detalle
    useEffect(() => {
        const handleDetailClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const detailButton = target.closest('[data-detail-id]');
            
            if (detailButton) {
                const courseId = (detailButton as HTMLElement).getAttribute('data-detail-id');
                if (courseId) {
                    // Aquí se podría implementar la obtención de detalles del curso
                    // usando el ID y un servicio o hook específico
                    setCourseDetails({
                        id: parseInt(courseId),
                        name: "Detalles del curso",
                        description: "Información detallada del curso seleccionado"
                    });
                    setIsOpen(true);
                }
            }
        };
        
        document.addEventListener('click', handleDetailClick);
        return () => document.removeEventListener('click', handleDetailClick);
    }, []);
    
    if (!courseDetails) return null;
    
    return (
        <Modal
            title={courseDetails.name}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <div className="space-y-4">
                <div>
                    <h3 className="font-medium">Descripción</h3>
                    <p className="text-sm text-gray-500">{courseDetails.description}</p>
                </div>
                
                {/* Aquí se pueden agregar más secciones con información detallada del curso */}
            </div>
        </Modal>
    );
};
