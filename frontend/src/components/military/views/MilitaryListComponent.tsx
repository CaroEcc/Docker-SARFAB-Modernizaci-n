import { useBreadcrumb } from '@/hooks/components/useBreadcrumb';
import { MilitaryFilters, MilitaryHeader, MilitaryTable } from '..';
import { useMilitary } from '@/hooks/military/useMilitary';
import type { MilitaryListViewProps } from '@/components/military/types';
import { useMemo } from 'react';

export function MilitaryListComponent(props: MilitaryListViewProps) {
  const { breadcrumb, initialStatusFilter, columns } = props;
  useBreadcrumb(breadcrumb);

  const military = useMilitary({ initialStatusFilter });

  const {
    data,
    isLoading,
    refetch,
    searchTerm,
    setSearchValue,
    status,
    setStatusFilter,
    page,
    setPageIndex,
    pageSize,
    setPageSize,
    orderByLastNameAsc,
    setOrderByLastNameAsc,
    rankId,
    setRankFilter,
    rankOptions,
  } = military;

  const statusOptions = useMemo(
    () =>
      [
        { value: '0', label: 'Desactivado' },
        { value: '1', label: 'Habilitado' },
      ].map((option) => ({
        ...option,
        isSelected: option.value === status,
      })),
    [status],
  );

  const hasFilters = Boolean(rankId || searchTerm || status);

  return (
    <>
      <MilitaryHeader />
      <MilitaryFilters
        searchValue={searchTerm}
        setSearchValue={setSearchValue}
        statusFilter={status}
        setStatusFilter={setStatusFilter}
        statusOptions={statusOptions}
        orderByLastNameAsc={orderByLastNameAsc}
        setOrderByLastNameAsc={setOrderByLastNameAsc}
        rankFilter={rankId}
        setRankFilter={setRankFilter}
        rankOptions={rankOptions || []}
      />
      <MilitaryTable
        isLoading={isLoading}
        data={data}
        columns={columns}
        pageIndex={page}
        pageSize={pageSize}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
        refetch={refetch}
        hasFilters={hasFilters}
      />
    </>
  );
}
