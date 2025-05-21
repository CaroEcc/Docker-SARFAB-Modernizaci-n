import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { VolunteerHeader } from "../headers/VolunteerHeader";
import { useGrades } from "@/hooks/grades/querys/useGrades";
import { useVolunteerActive } from "@/hooks/volunteer/querys/useVolunteerActive";
import { VolunteerActiveFilters } from "../filters/VolunteerActiveFilters";
import { VolunteerTable } from "../table/VolunteerTable";
import React, { ReactElement } from 'react';

export default function VolunteerActiveListView({ breadcrumb, columns, modalComponent }: VolunteerListViewProps) {
  useBreadcrumb(breadcrumb);
  const { data: grades } = useGrades();

  const {
    data, isLoading, refetch, isFetching, searchValue,
    setSearchValue, gradeIdFilter, setgradeIdFilter,
    pageIndex, setPageIndex, pageSize, setPageSize,
    orderByLastNameAsc,
    setOrderByLastNameAsc,
  } = useVolunteerActive();

  return (
    <>
      <VolunteerHeader />
      <VolunteerActiveFilters
        searchValue={searchValue} setSearchValue={setSearchValue}
        gradeIdFilter={gradeIdFilter} setgradeIdFilter={setgradeIdFilter}
        gradeIdOptions={[
          { value: "", label: "Todos los grados", isSelected: gradeIdFilter === "" },
          ...(grades?.map(grade => ({
            value: grade.id.toString(),
            label: grade.name,
            isSelected: false,
            key: grade.id.toString()
          })) || [])
        ]}
        orderByLastNameAsc={orderByLastNameAsc}
        setOrderByLastNameAsc={setOrderByLastNameAsc}
      />
      <VolunteerTable
        isLoading={isLoading} isFetching={isFetching} data={data} columns={columns}
        pageIndex={pageIndex} pageSize={pageSize}
        setPageIndex={setPageIndex} setPageSize={setPageSize} refetch={refetch}
        noItemsMessage="No existen voluntarios activos" noItemsLinkText="Agregar nuevo voluntario" noItemsLinkUrl=""
      />
      {Array.isArray(modalComponent)
        ? modalComponent.map((component, index) =>
          React.cloneElement(component as ReactElement, { key: `volunteer-modal-${index}` })
        )
        : modalComponent
      }
    </>
  )
}