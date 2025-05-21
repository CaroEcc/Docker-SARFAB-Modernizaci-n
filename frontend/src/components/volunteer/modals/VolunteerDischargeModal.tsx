import Button from "@/components/common/Button/Button";
import Modal from "@/components/common/Modal/Modal";
import { useStatusChangeVolunteer } from "@/hooks/volunteer/mutations/useStatusChangeVolunteer";
import { useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VolunteerDischargeModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

    const volunteerId = useMemo(() => Number(queryParams.get("volunteerId")), [queryParams]);
    const isDismissalModal = queryParams.get("dischargeVolunteer");
    const isOpen = Boolean(isDismissalModal);

    const [dischargeReason, setDischargeReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const { mutate } = useStatusChangeVolunteer("Error al dar de baja al voluntario", "Voluntario dado de baja correctamente");

    const handleConfirmDismissal = useCallback(() => {
        if (!dischargeReason.trim()) {
            setError("Este campo es obligatorio");
            return;
        }

        setError("");
        setIsSubmitting(true);
        mutate(
            { volunteerId, formData: { status: 0, dischargeReason } },
            {
                onSettled: () => {
                    setIsSubmitting(false);
                    navigate('/volunteers/volunteer-history', { replace: true });
                },
            }
        );
    }, [mutate, volunteerId, dischargeReason]);

    return (
        <Modal
            title="Dar de baja a voluntario"
            isOpen={isOpen}
            onClose={() => navigate(location.pathname, { replace: true })}
        >
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-4">
                ¿Estás seguro de que deseas dar de baja a este voluntario?
            </p>

            <fieldset disabled={isSubmitting}>
                <label htmlFor="dischargeReason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Motivo de la baja:
                </label>
                <input
                    id="dischargeReason"
                    type="text"
                    value={dischargeReason}
                    onChange={(e) => setDischargeReason(e.target.value)}
                    className={`w-full rounded border-[1.5px] py-3 px-5 pr-10 font-medium outline-none transition
                        ${error ? 'border-danger focus:border-danger' : 'border-stroke focus:border-primary'}
                        disabled:cursor-default :bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    placeholder="Escribe el motivo..."
                />
                {error && <p className="mt-1 text-sm text-danger font-bold">{error}</p>}
            </fieldset>

            <div className="flex justify-end gap-4 mt-6">
                <Button
                    label="Confirmar Baja"
                    onClick={handleConfirmDismissal}
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
