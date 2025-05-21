import Button from "@/components/common/Button/Button";
import Modal from "@/components/common/Modal/Modal";
import { useDeleteDemeritPoint } from "@/hooks/volunteer/mutations/useDeleteDemeritPoint";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VolunteerDeleteDemeritPointModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const demeritPointId = queryParams.get("demeritPointId");
    const isDeleteDemeritPointModal = queryParams.get("delete-demerit-point");
    const isOpen = !!isDeleteDemeritPointModal;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { mutate } = useDeleteDemeritPoint();

    const handlePromote = () => {
        if (!demeritPointId || isSubmitting) return;
        setIsSubmitting(true);
        mutate(demeritPointId, { 
            onSettled: () => setIsSubmitting(false) 
        });
    };

    return (
        <Modal
            title="Remover punto de demerito"
            isOpen={isOpen}
            onClose={() => navigate(location.pathname, { replace: true })}
        >
            <p className="text-lg font-semibold text-gray-600 mb-6">
                ¿Deseas remover este punto de demerito?
            </p>
            <div className="flex justify-end gap-4.5 mt-6">
                <Button
                    label={isSubmitting ? "Removiendo..." : "Sí, deseo remover punto de demerito"}
                    onClick={handlePromote}
                    type="submit"
                    disabled={isSubmitting || !demeritPointId}
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
