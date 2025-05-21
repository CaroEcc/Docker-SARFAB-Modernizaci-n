import { useLocation, useNavigate } from "react-router-dom";

export function useMilitaryModal(modalName: string, identificator: string) {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    return {
        isModalOpen: !!queryParams.get(modalName),
        militaryId: queryParams.get(identificator),
        closeModal: () => navigate(location.pathname, { replace: true })
    };
}
