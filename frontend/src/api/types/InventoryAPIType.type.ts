export type GetInventoryItemsParams = {
  searchTerm?: string;
  orderByNameAsc?: boolean;
  pageIndex?: number;
  pageSize?: number;
};

export type GetMovementHistoryParams = {
  searchTerm?: string;
  movementType?: number;
  startDate?: string;
  endDate?: string;
  pageIndex?: number;
  pageSize?: number;
};