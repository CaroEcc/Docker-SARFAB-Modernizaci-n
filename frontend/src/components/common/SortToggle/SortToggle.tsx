import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";

interface SortToggleProps {
  isAscending: boolean;
  onToggle: () => void;
}

const SortToggle: React.FC<SortToggleProps> = ({ isAscending, onToggle }) => {
  return (
    <button 
      onClick={onToggle}
      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary transition"
    >
      Ordenar
      {isAscending ? <RiArrowUpSLine size={25} /> : <RiArrowDownSLine size={25} />}
    </button>
  );
};

export default SortToggle;
