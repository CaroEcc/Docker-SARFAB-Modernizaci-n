import Button from "@/components/common/Button/Button";
import Modal from "@/components/common/Modal/Modal";
import { useStatusChangeVolunteer } from "@/hooks/volunteer/mutations/useStatusChangeVolunteer";
import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VolunteerServiceCompletedModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const volunteerId = Number(queryParams.get("volunteerId"));
    const isServiceCompletedModal = queryParams.get("serviceCompleted");
    const isOpen = !!isServiceCompletedModal;

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { mutate } = useStatusChangeVolunteer("Ocurrió un error marcar como cumplido el servicio del voluntario", "Voluntario ha sido marcado como cumplido el servicio correctamente");

    const handleConfirm = useCallback(() => {
        setIsSubmitting(true);
        mutate(
            { volunteerId, formData: { status: 2, dischargeReason: "" } },
            {
                onSettled: () => {
                    setIsSubmitting(false);
                    navigate('/volunteers/volunteer-history', { replace: true });
                },
            }
        );
    }, [mutate, volunteerId]);

    return (
        <Modal
            title="Servicio Finalizado"
            isOpen={isOpen}
            onClose={() => navigate(location.pathname, { replace: true })}
        >
            <p className="text-lg font-semibold text-gray-600 mb-6">
                El voluntario ha finalizado satisfactoriamente su periodo de servicio
            </p>
            <div className="flex justify-end gap-4.5 mt-6">
                <Button
                    label="Confirmar"
                    onClick={handleConfirm}
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                />
                <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    onClick={() => navigate(location.pathname, { replace: true })}
                    type="button"
                >
                    Cerrar
                </button>
            </div>
        </Modal>
    );
}
