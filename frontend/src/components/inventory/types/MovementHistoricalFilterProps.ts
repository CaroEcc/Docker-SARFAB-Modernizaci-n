export type MovementHistoricalFilterProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  movementType: number | undefined;
  setMovementType: (value: number | undefined) => void;
  startDate: string | undefined;
  setStartDate: (value: string | undefined) => void;
  endDate: string | undefined;
  setEndDate: (value: string | undefined) => void;
  refetch: () => void;
};
