import { Dispatch, SetStateAction } from "react";

export interface InventoryFilterProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  orderByNameAsc: boolean;
  setOrderByNameAsc: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
}
