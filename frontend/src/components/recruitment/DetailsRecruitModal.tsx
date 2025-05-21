import Loader from "../common/Loader";
import Modal from "../common/Modal/Modal";
import RecruitDetails from "./RecriutDetails";
import { useRecruitData, useRecruitModal } from "@/hooks/recruitment";

export default function DetailsRecruitModal() {
    const { isModalOpen, recruitId, closeModal } = useRecruitModal("viewRecruit", "recruitId");
    const { data, isLoading, error } = useRecruitData(recruitId);

    return (
        <Modal title="Detalles del recluta" isOpen={!!isModalOpen} onClose={closeModal}>
            {
                isLoading ?
                    <><Loader message="Cargando datos del recluta"/></> :

                    <>{error || !data ?
                        <p>Error al cargar los datos del reclutamiento.</p> :
                        <>
                            <div className="p-7">
                                <RecruitDetails recruit={data} />
                            </div>
                        </>
                    }
                    </>
            }
        </Modal>

    );
}