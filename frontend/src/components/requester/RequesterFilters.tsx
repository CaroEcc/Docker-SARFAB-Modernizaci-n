import FilterSearchBox from "@/components/common/FilterSearchBox/FilterSearchBox";

interface RequesterFiltersProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export function RequesterFilters({ searchValue, setSearchValue }: RequesterFiltersProps) {
  return (
    <div className="container mx-auto mb-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <FilterSearchBox
            name="searchRequester"
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Buscar por nombre del solicitante"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
