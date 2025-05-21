import FilterDatalist from "../common/FilterDatalist/FilterDatalist";
import FilterRangeDates from "@/components/common/FilterRangeDate/FilterRangeDates";
import FilterSearchBox from "../common/FilterSearchBox/FilterSearchBox";
import FilterSelect from "../common/FilterSelect/FilterSelect";
import { OperationFilterProps } from "./types/OperationFilterProps";

export function OperationFilter({
  searchValue,
  setSearchValue,
  statusFilter,
  setStatusFilter,
  statusOptions,
  municipalityFilter,
  setMunicipalityFilter,
  municipalityOptions,
  categoryFilter,
  setCategoryFilter,
  categoryOptions,
  setStartDateFilter,
  setEndDateFilter,
  refetch,
}: OperationFilterProps) {
  
  function handleRangeSelect(range: { startDate: string | undefined; endDate: string | undefined }) {
    setStartDateFilter(range.startDate);
    setEndDateFilter(range.endDate);
    refetch();
  }  

  return (
    <div className="flex flex-col gap-5.5 sm:flex-row mt-3">
      <FilterSearchBox
        name="searchTerm"
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Buscar dirección o solicitante"
      />
      <div className="sm:w-auto w-full min-w-[170px]">
        <FilterSelect
          name="status"
          label="Seleccionar por estado"
          options={statusOptions.map(({ id, name }) => ({
            value: id.toString(),
            label: name,
            isSelected: id === statusFilter,
          }))}
          value={statusFilter?.toString() || statusOptions[0]?.id.toString()}
          onChange={(value) => setStatusFilter(value ? Number(value) : statusOptions[0]?.id)}
        />
      </div>
      <FilterDatalist
        name="municipality"
        label="Todos los municipios"
        options={municipalityOptions}
        onChange={(value) => {
          const selected = municipalityOptions.find((option) => option.name === value);
          setMunicipalityFilter(selected?.id);
        }}
        value={
          municipalityFilter !== undefined
            ? municipalityOptions.find((option) => option.id === municipalityFilter)?.name || ""
            : ""
        }
        showLabel={false}
      />
      <FilterSelect
        name="category"
        label="Seleccionar por categoría"
        options={[
          { value: "", label: "Todas las categorías", isSelected: categoryFilter === undefined },
          ...categoryOptions.map(({ id, name }) => ({
            value: id.toString(),
            label: name,
            isSelected: id === categoryFilter,
          })),
        ]}
        value={categoryFilter?.toString() || ""}
        onChange={(value) => setCategoryFilter(value ? Number(value) : undefined)}
      />
      <FilterRangeDates
        onChange={handleRangeSelect}
        refetch={refetch}
      />
    </div>
  );
}
