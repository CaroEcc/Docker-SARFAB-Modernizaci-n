import FilterSearchBox from "../../common/FilterSearchBox/FilterSearchBox";
import FilterSelect from "../../common/FilterSelect/FilterSelect";
import SortToggle from "../../common/SortToggle/SortToggle";
import { VolunteerActiveFiltersProps } from "../types/VolunteerActiveFiltersProps.types";

export function VolunteerActiveFilters({ searchValue, setSearchValue, gradeIdFilter, setgradeIdFilter, 
        gradeIdOptions, orderByLastNameAsc, setOrderByLastNameAsc, }: VolunteerActiveFiltersProps) {
    return (
        <div className='flex flex-col gap-5.5 sm:flex-row mt-3'>
            <FilterSearchBox name='searchTerm' value={searchValue} onChange={setSearchValue} placeholder="Buscar por nombre o carnet de identidad" />
            <FilterSelect name='gradeId' label="Seleccionar por estado" options={gradeIdOptions} value={gradeIdFilter} onChange={setgradeIdFilter} />
            <SortToggle isAscending={orderByLastNameAsc} onToggle={() => setOrderByLastNameAsc(prev => !prev)}/>
        </div>
    );
}