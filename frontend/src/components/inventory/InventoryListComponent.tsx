import { useBreadcrumb } from '@/hooks/components/useBreadcrumb';
import { InventoryListComponentProps } from './types/InventoryListComponentProps';
import { InventoryHeader } from './InventoryHeader';
import { useInventoryItems } from '@/hooks/inventory/querys/useInventoryItems';
import { InventoryFilters } from './InventoryFilters';
import { InventoryTable } from './InventoryTable';

export function InventoryListComponent(props: InventoryListComponentProps) {
  const { breadcrumb, columns } = props;
  useBreadcrumb(breadcrumb);

  const {
    data,
    isLoading,
    refetch,
    searchValue,
    setSearchValue,
    orderByNameAsc,
    setOrderByNameAsc,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
  } = useInventoryItems();

  const hasFilters = !!(searchValue || orderByNameAsc);

  return (
    <>
      <InventoryHeader />
      <InventoryFilters
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        orderByNameAsc={orderByNameAsc}
        setOrderByNameAsc={setOrderByNameAsc}
        refetch={refetch}
      />
      <InventoryTable
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
