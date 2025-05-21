import { useBreadcrumb } from '@/hooks/components/useBreadcrumb';
import { useMovementHistory } from '@/hooks/inventory/querys/useMovementHistory';
import { MovementHistoricalListComponentProps } from './types/MovementHistoricalListComponentProps';
import { MovementHistoricalFilters } from './MovementHistoricalFilters';
import { MovementHistoricalTable } from './MovementHistoricalTable';

export function MovementHistoricalListComponent(props: MovementHistoricalListComponentProps) {
  const { breadcrumb, columns } = props;
  useBreadcrumb(breadcrumb);

  const {
    data,
    isLoading,
    refetch,
    searchValue,
    setSearchValue,
    movementType,
    setMovementType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
  } = useMovementHistory();
  const hasFilters = !!(searchValue || movementType || startDate || endDate);

  return (
    <>
      <MovementHistoricalFilters
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        movementType={movementType}
        setMovementType={setMovementType}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        refetch={refetch}
      />
      <MovementHistoricalTable
        isLoading={isLoading}
        data={data}
        columns={columns}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
        refetch={refetch}
        hasFilters={hasFilters}
      />
    </>
  );
}
