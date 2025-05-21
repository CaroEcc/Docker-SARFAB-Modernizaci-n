import { useNavigate } from "react-router-dom";
import Modal from "../common/Modal/Modal";
import Button from "../common/Button/Button";

export default function RecruitContinueVolunteerModal() {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const isModalOpen = Boolean(queryParams.get('continue-afiliation'));
    const recruitId = queryParams.get('recruitId');

    const handleContinue = () => {
        const newParams = new URLSearchParams(location.search);
        const id = recruitId ?? 'defaultId';
        newParams.set('recruitId', id);

        navigate(`/volunteers/create?${newParams.toString()}`);
    };

    return (
        <Modal title="Continuar con afiliación" isOpen={isModalOpen} onClose={() => navigate(location.pathname, { replace: true })}>
            <p className="text-lg font-semibold text-gray-600 mb-6">
                ¿Deseas continuar con la afiliación del recluta como voluntario?
                <div className="flex justify-end gap-4.5 mt-6">
                    <Button
                        label="Si, deseo continuar con la afiliación"
                        onClick={handleContinue}
                        type="submit"
                        disabled={!recruitId}
                        isLoading={false}
                    />
                    <button
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        onClick={() => navigate(location.pathname, { replace: true })}
                        type="button"
                    >
                        Cancelar
                    </button>
                </div>
            </p>
        </Modal>
    );
}
