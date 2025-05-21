import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { DateRange, DateRangePicker, RangeKeyDict, createStaticRanges, defaultStaticRanges } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { RiCalendarLine, RiCloseLine } from "@remixicon/react";
import Modal from "../Modal/Modal";
import './FilterRangeDate.css'
import { FilterRangeDateProps } from "./FilterRangeDateProps.type";

const translationMap: Record<string, string> = {
  "Today": "Hoy",
  "Yesterday": "Ayer",
  "This Week": "Esta semana",
  "Last Week": "La semana pasada",
  "This Month": "Este mes",
  "Last Month": "Mes pasado",
};

const customStaticRanges = createStaticRanges(
  defaultStaticRanges.map((range) => ({
    ...range,
    label: range.label ? translationMap[range.label] || range.label : "Sin etiqueta",
  }))
);

const FilterRangeDates: React.FC<FilterRangeDateProps> = ({ onChange, refetch }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [range, setRange] = useState<{ startDate?: Date; endDate?: Date; key: string }[]>([
    { startDate: undefined, endDate: undefined, key: "selection" },
  ]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSelect = (ranges: RangeKeyDict) => {
    const selection = ranges["selection"];

    if (selection) {
      const formattedStartDate = selection.startDate
        ? format(selection.startDate, "yyyy/MM/dd")
        : undefined;
      const formattedEndDate = selection.endDate
        ? format(selection.endDate, "yyyy/MM/dd")
        : undefined;

      setRange([{ startDate: selection.startDate, endDate: selection.endDate, key: "selection" }]);
      onChange({ startDate: formattedStartDate, endDate: formattedEndDate });
    }
  };

  const handleClear = (event: React.MouseEvent) => {
    event.stopPropagation();
    const emptyRange = { startDate: undefined, endDate: undefined, key: "selection" };
    setRange([emptyRange]);
    onChange(emptyRange);
    setShowPicker(false);
    refetch();
  };

  return (
    <div className="relative w-full">
      <div
        className="relative z-20 bg-white dark:bg-form-input border border-stroke 
             py-3.5 px-6 rounded cursor-pointer flex justify-between items-center 
             focus-within:border-primary dark:border-form-strokedark"
        onClick={() => setShowPicker(!showPicker)}
      >
        <span
          className={`text-gray-600 dark:text-white leading-none ${range[0].startDate && range[0].endDate
            ? 'text-base md:text-xs whitespace-nowrap'
            : 'text-base'
            }`}
        >
          {range[0].startDate && range[0].endDate
            ? `${format(range[0].startDate, "dd/MM/yyyy")} - ${format(range[0].endDate, "dd/MM/yyyy")}`
            : "Seleccionar rango"}
        </span>
        <div className="flex gap-2 items-center">
          {range[0].startDate && range[0].endDate && (
            <RiCloseLine size={20} className="text-gray-500 cursor-pointer" onClick={handleClear} />
          )}
          <RiCalendarLine size={20} className="text-gray-500" />
        </div>
      </div>

      {showPicker && (
        <div className={`absolute z-30 mt-2 bg-white dark:bg-gray-800 shadow-md p-4 rounded min-w-[250px] w-fit ${!isMobile ? 'right-0 left-auto' : ''
          }`}>
          {
            !isMobile ?
              <DateRangePicker
                editableDateInputs
                onChange={handleSelect}
                ranges={range}
                staticRanges={customStaticRanges}
                locale={es}
                showDateDisplay={false}
                inputRanges={[]}
                moveRangeOnFirstSelection={false}
                months={2}
                direction={"vertical"}
              />
              :
              <Modal isOpen={showPicker} onClose={() => setShowPicker(false)} title="" fitContent={true}>
                <div className="flex justify-between mb-2">
                  <RiCloseLine size={25} className="text-gray-500 cursor-pointer" onClick={handleClear} />
                  <span onClick={() => setShowPicker(false)}>Finalizar</span>
                </div>
                <div className="custom-date-range">
                  <DateRange
                    editableDateInputs
                    onChange={handleSelect}
                    ranges={range}
                    locale={es}
                    showDateDisplay={false}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    direction="vertical"
                  />
                </div>
              </Modal>
          }
        </div>
      )}
    </div>
  );
};

export default FilterRangeDates;
