import FilterSearchBox from "../common/FilterSearchBox/FilterSearchBox";
import SortToggle from "../common/SortToggle/SortToggle";
import { InventoryFilterProps } from "./types/InventoryFilterProps";

export function InventoryFilters(props: InventoryFilterProps) {
  const { searchValue, setSearchValue, orderByNameAsc, setOrderByNameAsc, refetch } = props;
  return (
    <div className="flex flex-col gap-5.5 sm:flex-row mt-3">
      <FilterSearchBox
        name="searchTerm"
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Buscar por nombre del elemento"
      />
      <div className="flex justify-center sm:justify-start">
        <SortToggle
          isAscending={orderByNameAsc}
          onToggle={() => {
            setOrderByNameAsc(!orderByNameAsc);
            refetch();
          }}
        />
      </div>
    </div>
  );
}