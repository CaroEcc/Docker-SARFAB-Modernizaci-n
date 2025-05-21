import { RiAddLine } from "@remixicon/react";
import { useState } from "react";
import CreateUserModal from "./CreateUserModal";

export function UserHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <nav>
                <div onClick={openModal} style={{ cursor: "pointer" }} className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-10 text-white hover:bg-opacity-90">
                    <RiAddLine className='me-2' /> Registrar usuario
                </div>
            </nav>
            {isModalOpen &&
                <CreateUserModal isOpen onClose={closeModal} />
            }
        </>
    );
}