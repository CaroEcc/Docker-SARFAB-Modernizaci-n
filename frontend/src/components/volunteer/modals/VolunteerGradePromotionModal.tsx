import Button from "@/components/common/Button/Button";
import Modal from "@/components/common/Modal/Modal";
import { useGradePromotionVolunteer } from "@/hooks/volunteer/mutations/useGradePromotionVolunteer";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VolunteerGradePromotionModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const volunteerId = Number(queryParams.get("volunteerId"));
    const isAssingCourseModal = queryParams.get("gradePromotion");
    const isOpen = !!isAssingCourseModal;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { mutate } = useGradePromotionVolunteer();

    const handlePromote = () => {
        if (!volunteerId || isSubmitting) return; // Previene el doble clic
        setIsSubmitting(true);
        mutate(Number(volunteerId), { 
            onSettled: () => setIsSubmitting(false) 
        });
    };

    return (
        <Modal
            title="Ascender a voluntario"
            isOpen={isOpen}
            onClose={() => navigate(location.pathname, { replace: true })}
        >
            <p className="text-lg font-semibold text-gray-600 mb-6">
                ¿Deseas Ascender a este recluta como voluntario?
            </p>
            <div className="flex justify-end gap-4.5 mt-6">
                <Button
                    label={isSubmitting ? "Promoviendo..." : "Sí, deseo Ascender a este voluntario"}
                    onClick={handlePromote}
                    type="submit"
                    disabled={isSubmitting || !volunteerId}
                    isLoading={isSubmitting}
                />
                <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    onClick={() => navigate(location.pathname, { replace: true })}
                    type="button"
                >
                    Cancelar
                </button>
            </div>
        </Modal>
    );
}
