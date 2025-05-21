import { useNavigate } from "react-router-dom";

interface ActionsProps {
  volunteerId: string;
  setModalAction: (action: string) => void;
}

const Actions: React.FC<ActionsProps> = ({ volunteerId, setModalAction }) => {
  const navigate = useNavigate();

  const handleOpenModal = (action: string) => {
    navigate(`?${action}=true&volunteerId=${volunteerId}`);
    setModalAction(action);
  };

  return (
    <>
      <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
        Acciones
      </h3>
      <div className="flex flex-col gap-4 max-w-md mx-auto my-5">
        <div className="flex gap-4 w-full">
          <button
            className="w-full bg-success text-white py-3 rounded-lg"
            onClick={() => handleOpenModal("gradePromotion")}
          >
            Ascender voluntario
          </button>
          <button
            className="w-full border-2 border-success text-success py-3 rounded-lg"
            onClick={() => handleOpenModal("serviceCompleted")}
          >
            Cumplió el servicio
          </button>
        </div>
        <button
          className="w-full bg-meta-1 text-white py-3 rounded-lg"
          onClick={() => handleOpenModal("dischargeVolunteer")}
        >
          Dar de baja
        </button>
        <button
          className="w-full bg-primary text-white py-3 rounded-lg"
          onClick={() => handleOpenModal("assingCourse")}
        >
          Agregar nuevo curso a voluntario
        </button>
      </div>
    </>
  );
};

export default Actions;