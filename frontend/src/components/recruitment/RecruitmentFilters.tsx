import FilterSearchBox from "../common/FilterSearchBox/FilterSearchBox";

export function RecruitmentFilters({ searchValue, setSearchValue }: RecruitmentFiltersProps) {
    return (
        <div className='flex flex-col gap-5.5 sm:flex-row mt-3'>
            <FilterSearchBox name='searchTerm' value={searchValue} onChange={setSearchValue} placeholder="Buscar por nombre o carnet de identidad" />
        </div>
    );
}