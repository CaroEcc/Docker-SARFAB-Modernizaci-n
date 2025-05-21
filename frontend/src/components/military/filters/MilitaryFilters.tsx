import { useMemo } from "react";
import FilterSearchBox from "@/components/common/FilterSearchBox/FilterSearchBox";
import FilterSelect from "@/components/common/FilterSelect/FilterSelect";
import SortToggle from "@/components/common/SortToggle/SortToggle";
import { MilitaryFiltersProps } from "@/components/military/types/MilitaryFiltersProps";

export function MilitaryFilters({
  searchValue,
  setSearchValue,
  statusFilter,
  setStatusFilter,
  statusOptions,
  rankFilter = null,
  setRankFilter,
  rankOptions = [],
  orderByLastNameAsc,
  setOrderByLastNameAsc,
}: MilitaryFiltersProps) {

  const updatedStatusOptions = useMemo(() => 
    statusOptions.map(option => ({
      ...option,
      isSelected: option.value === statusFilter,
    }))
  , [statusOptions, statusFilter]);

  const updatedRankOptions = useMemo(() => [
    { value: "null", label: "Todos los rangos", isSelected: rankFilter === null },
    ...rankOptions.map(option => ({
      ...option,
      value: option.value.toString(),
      isSelected: option.value === rankFilter,
    })),
  ], [rankOptions, rankFilter]);

  const handleRankChange = (value: string) => {
    if (setRankFilter) {
      setRankFilter(value === "null" ? null : Number(value));
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-3 items-center">
      <div className="w-full sm:flex-grow sm:w-3/5">
        <FilterSearchBox 
          name="searchTerm" 
          value={searchValue} 
          onChange={setSearchValue} 
          placeholder="Buscar por apellido o nombre" 
          className="w-full"
        />
      </div>
      <div className="w-full sm:w-1/5">
        <FilterSelect 
          name="status" 
          label="Estado" 
          options={updatedStatusOptions} 
          value={statusFilter} 
          onChange={setStatusFilter} 
        />
      </div>
      <div className="w-full sm:w-1/4">
        <FilterSelect 
          name="rank"
          label="Rango" 
          options={updatedRankOptions}
          value={rankFilter !== null ? rankFilter.toString() : "null"}
          onChange={handleRankChange}
        />
      </div>
      <div className="flex items-center w-auto">
        <SortToggle 
          isAscending={orderByLastNameAsc}
          onToggle={() => setOrderByLastNameAsc(prev => !prev)}
        />
      </div>
    </div>
  );
}
