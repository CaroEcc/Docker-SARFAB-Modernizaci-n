import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateRecruitStatus } from "./mutations/useUpdateRecruitStatus";
import { useRecruitData } from "./querys/useRecruitData";
import { useState } from "react";

export function useRecruitStatusModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const recruitId = queryParams.get("recruitId");
    const isApproveModal = queryParams.get("approveRecruit");
    const isDenyModal = queryParams.get("denyRecruit");
    const isOpen = !!isApproveModal || !!isDenyModal;

    const status = isApproveModal ? 2 : 0;
    const title = isApproveModal ? "Aprobar recluta" : "Rechazar recluta";
    const confirmText = isApproveModal ? "APROBAR RECLUTA" : "RECHAZAR RECLUTA";
    const loadingText = isApproveModal ? "Aprobando..." : "Rechazando...";
    const message = isApproveModal
        ? "¿Estás seguro de que deseas aprobar a este recluta?"
        : "¿Estás seguro de que deseas rechazar a este recluta?";

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data, isLoading, error } = useRecruitData(recruitId);
    const { mutate } = useUpdateRecruitStatus();

    const handleSubmit = () => {
        if (!recruitId) return;
        setIsSubmitting(true);
        mutate({ recruitId: Number(recruitId), status }, { 
            onSettled: () => setIsSubmitting(false) });
    };

    return {
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
    };
}
