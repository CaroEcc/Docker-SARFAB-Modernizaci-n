import { RiClipboardFill } from "@remixicon/react";
import { useNavigate } from "react-router-dom";

interface AssistanceProps {
  volunteerId: string;
  totalDemeritPoint: { totalPointsLost: number };
  volunteerType: string;
}

const Assistance: React.FC<AssistanceProps> = ({ volunteerId, totalDemeritPoint, volunteerType }) => {
  const navigate = useNavigate();
  const pointsLost = totalDemeritPoint?.totalPointsLost ?? 0;
  
  let textColor = "";
  if (volunteerType === "Libretista") {
    textColor = pointsLost >= 6 ? "text-danger" : "text-primary";
  } else {
    textColor = pointsLost >= 12 ? "text-danger" : "text-primary";
  }

  const redirectUrl = `/volunteers/${volunteerId}/demerit-points`;

  const handleRedirect = () => {
    navigate(redirectUrl);
  };

  return (
    <div className="flex-row items-center h-full justify-center p-6">
      <div className="px-6 mt-5">
        <h3 className="dark:text-white text-2xl font-semibold text-black">Cantidad total de faltas acomuladas</h3>
        <p className="text-gray-500">Total de faltas acomuladas en operativos y guardias</p>
        <p className={`text-title-xxl text-center font-bold mt-5 ${textColor}`}>
          {pointsLost} {pointsLost === 1 ? "Falta" : "Faltas"}
        </p>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleRedirect}
            className="text-primary text-lg hover:underline"
          >
            Ver registro
          </button>
          <button
            onClick={handleRedirect}
            className="bg-gray-300 p-3 rounded-lg hover:bg-gray-400 transition-colors"
          >
            <RiClipboardFill className="text-gray-700 w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assistance;
