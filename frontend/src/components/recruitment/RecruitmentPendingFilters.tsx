import FilterSearchBox from "../common/FilterSearchBox/FilterSearchBox";
import FilterSelect from "../common/FilterSelect/FilterSelect";

export function RecruitmentPendingFilters({ searchValue, setSearchValue, statusFilter, setStatusFilter, statusOptions }: RecruitmentPendingFiltersProps) {
    return (
        <div className='flex flex-col gap-5.5 sm:flex-row mt-3'>
            <FilterSearchBox name='searchTerm' value={searchValue} onChange={setSearchValue} placeholder="Buscar por nombre o carnet de identidad" />
            <FilterSelect name='status' label="Seleccionar por estado" options={statusOptions} value={statusFilter} onChange={setStatusFilter} />
        </div>
    );
}