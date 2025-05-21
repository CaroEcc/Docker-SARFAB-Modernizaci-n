import FilterSearchBox from "../common/FilterSearchBox/FilterSearchBox";

interface OperationCategoryFiltersProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export function OperationCategoryFilters({ 
  searchValue, 
  setSearchValue 
}: OperationCategoryFiltersProps) {
  return (
    <div className='flex flex-col gap-5.5 sm:flex-row mt-3'>
      <FilterSearchBox 
        name='searchTerm' 
        value={searchValue} 
        onChange={setSearchValue} 
        placeholder="Buscar por nombre de categoría o nombre de tipo de operación" 
      />
    </div>
  );
}
