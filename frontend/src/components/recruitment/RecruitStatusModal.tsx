import Modal from "../common/Modal/Modal";
import RecruitDetails from "./RecriutDetails";
import Button from "../common/Button/Button";
import { useRecruitStatusModal } from "@/hooks/recruitment";
import Loader from "../common/Loader";

export default function RecruitStatusModal() {
    const {
        navigate,
        location,
        isOpen,
        title,
        message,
        confirmText,
        loadingText,
        isSubmitting,
        isLoading,
        error,
        data,
        handleSubmit,
    } = useRecruitStatusModal();

    return (
        <Modal title={title} isOpen={isOpen} onClose={() => navigate(location.pathname, { replace: true })}>
            {
                isLoading ?
                    <><Loader message="Cargando datos del recluta..."/></> :

                    <>{error || !data ?
                        <p>Error al cargar los datos del reclutamiento.</p> :
                        <>
                            <p className="text-lg font-semibold text-gray-600 mb-6">
                                Parece que quieres {title.toLowerCase()}.{" "}
                                <span className="text-fuchsia-600">{message}</span>
                            </p>

                            <div className="p-7">
                                <RecruitDetails recruit={data} />

                                <div className="flex justify-end gap-4.5 mt-6">
                                    <Button
                                        label={isSubmitting ? loadingText : confirmText}
                                        onClick={handleSubmit}
                                        type="submit"
                                        disabled={isSubmitting}
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
                            </div></>
                    }
                    </>
            }
        </Modal>
    );
}
