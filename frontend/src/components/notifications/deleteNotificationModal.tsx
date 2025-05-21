import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../common/Modal/Modal";
import Button from "../common/Button/Button";
import { useState } from "react";
import { useDeleteNotification } from "@/hooks/notification/mutations/useDeleteNotification";

export default function DeleteNotificationModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const notificationId = queryParams.get("notificationId");
    const isDeleteNotiicationModal = queryParams.get("delete-notification");
    const isOpen = !!isDeleteNotiicationModal;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { mutate: eliminarNotificacion } = useDeleteNotification();

    const handleDelete = () => {
        if (!notificationId) return;

        setIsSubmitting(true);
        eliminarNotificacion(Number(notificationId), {
            onSuccess: () => {
                setIsSubmitting(false);
                navigate(location.pathname, { replace: true });
            },
            onError: () => {
                setIsSubmitting(false);
            },
        });
    };

    const handleClose = () => {
        navigate(location.pathname, { replace: true });
    };

    return (
        <Modal title={"Eliminar notificación"} isOpen={isOpen} onClose={handleClose}>
            <p className="text-lg font-thin text-gray-600 mb-6">
                Parece que quieres eliminar una notificación.
                <span className="text-body font-semibold"> ¿Estás seguro de que quieres eliminar esta notificación?</span>
            </p>
            <div className="flex justify-end gap-4.5 mt-6">
                <Button
                    label={isSubmitting ? "Eliminando..." : "Eliminar notificación"}
                    type="button"
                    onClick={handleDelete}
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                />
                <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    onClick={handleClose}
                    type="button"
                >
                    Cancelar
                </button>
            </div>
        </Modal>
    );
}
