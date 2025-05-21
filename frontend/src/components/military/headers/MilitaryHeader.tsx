import { useEffect, useState } from 'react';
import { RiAddLine } from '@remixicon/react';
import { MilitaryFormModal } from '@/components/military';
import { useLocation, useNavigate } from 'react-router-dom';


export function MilitaryHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.search.includes('openMilitaryModal=true')) {
      setIsModalOpen(true);
    }
  }, [location]);

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/military/list', { replace: true });
  };
  return (
    <nav>
      <button
        onClick={() => !isModalOpen && setIsModalOpen(true)}
        className="w-full md:w-auto inline-flex items-center justify-center rounded-md bg-primary py-2 px-10 text-white hover:bg-opacity-90"
      >
        <RiAddLine className="me-2" /> Añadir nuevo personal militar
      </button>
      {isModalOpen && (
        <MilitaryFormModal isOpen onClose={closeModal} />
      )}
    </nav>
  );
}
