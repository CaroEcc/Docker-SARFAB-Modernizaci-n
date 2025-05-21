import Button from "@/components/common/Button/Button";
import Modal from "@/components/common/Modal/Modal";
import { useStatusChangeVolunteer } from "@/hooks/volunteer/mutations/useStatusChangeVolunteer";
import { useMemo, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VolunteerReincorpotateModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

    const volunteerId = useMemo(() => Number(queryParams.get("volunteerId")), [queryParams]);
    const isReincorpotateModal = queryParams.get("ReincorpotateVolunteer");
    const isOpen = Boolean(isReincorpotateModal);

    const { mutate } = useStatusChangeVolunteer("Error al reincorporar el voluntario", "Voluntario reincorporado correctamente");

    const handleConfirmReincorpotate = useCallback(() => {
        setIsSubmitting(true);
        mutate(
            { volunteerId, formData: { status: 1 } }, // Estado 1: activo
            {
                onSettled: () => {
                    setIsSubmitting(false);
                    navigate('/volunteers/active-volunteers', { replace: true });
                },
            }
        );
    }, [mutate, volunteerId, navigate, location.pathname]);

    return (
        <Modal
            title="Reincorporar voluntario"
            isOpen={isOpen}
            onClose={() => navigate(location.pathname, { replace: true })}
        >
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-4">
                ¿Estás seguro de que deseas reincorporar a este voluntario?
            </p>

            <div className="flex justify-end gap-4 mt-6">
                <Button
                    label="Confirmar reincorporación"
                    onClick={handleConfirmReincorpotate}
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                />
                <button
                    className="flex justify-center rounded border border-gray-300 py-2 px-6 font-medium text-gray-700 hover:shadow-md dark:border-gray-600 dark:text-white"
                    onClick={() => navigate(location.pathname, { replace: true })}
                    type="button"
                >
                    Cancelar
                </button>
            </div>
        </Modal>
    );
}
