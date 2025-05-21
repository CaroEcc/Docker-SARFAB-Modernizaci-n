import { useMemo } from "react";
import FilterSearchBox from "../common/FilterSearchBox/FilterSearchBox";
import FilterSelect from "../common/FilterSelect/FilterSelect";
import FilterRangeDates from "@/components/common/FilterRangeDate/FilterRangeDates";
import { MovementHistoricalFilterProps } from "./types/MovementHistoricalFilterProps";

export function MovementHistoricalFilters(props: MovementHistoricalFilterProps) {
  const {
    searchValue,
    setSearchValue,
    movementType,
    setMovementType,
    setStartDate,
    setEndDate,
    refetch,
  } = props;

  const movementTypeOptions = useMemo(() => [
    { value: "", label: "Todos los tipos", isSelected: movementType === undefined },
    { value: "0", label: "Extracción", isSelected: movementType === 0 },
    { value: "1", label: "Devolución", isSelected: movementType === 1 }
  ], [movementType]);

  const handleMovementTypeChange = (value: string) => {
    setMovementType(value === "" ? undefined : Number(value));
  };

  const handleRangeSelect = (range: { startDate: string | undefined; endDate: string | undefined }) => {
    setStartDate(range.startDate);
    setEndDate(range.endDate);
    refetch();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-3 items-center">
      <div className="w-full sm:w-3/5 md:w-2/5">
        <FilterSearchBox
          name="searchTerm"
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Buscar por nombre del elemento o voluntario"
          className="w-full"
        />
      </div>
      <div className="w-full sm:w-1/5 md:w-1/4">
        <FilterSelect
          name="movementType"
          label="Tipo"
          options={movementTypeOptions}
          value={String(movementType ?? "")}
          onChange={handleMovementTypeChange}
        />
      </div>
      <div className="w-full sm:w-auto md:w-1/3">
        <FilterRangeDates
          onChange={handleRangeSelect}
          refetch={refetch}
        />
      </div>
    </div>
  );
}
