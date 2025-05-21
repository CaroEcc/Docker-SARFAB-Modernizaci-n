import { useRecruitData, useRecruitModal } from "@/hooks/recruitment";
import RecruitDetails from "../recruitment/RecriutDetails";
import Modal from "../common/Modal/Modal";

export default function OperationMessageModal() {
  const { isModalOpen, recruitId, closeModal } = useRecruitModal("viewRecruit", "recruitId");
    const { data, isLoading, error } = useRecruitData(recruitId);

    return (
        <Modal title="Detalles del recluta" isOpen={!!isModalOpen} onClose={closeModal}>
            {
                isLoading ?
                    <><p>Cargando...</p></> :

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