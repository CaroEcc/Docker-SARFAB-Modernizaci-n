import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { VolunteerHistoricalFilters } from "../filters/VolunteerHistoricalFilters";
import { VolunteerHeader } from "../headers/VolunteerHeader";
import { VolunteerTable } from "../table/VolunteerTable";
import { useGrades } from "@/hooks/grades/querys/useGrades";
import { useVolunteerHistorical } from "@/hooks/volunteer/querys/useVolunteerHistorical";

export default function VolunteerHistoricalListView({ breadcrumb, columns, modalComponent }: VolunteerListViewProps) {
    useBreadcrumb(breadcrumb);
    const { data: grades } = useGrades();

    const {
        data, isLoading, isFetching, refetch, searchValue,
        setSearchValue, gradeIdFilter, setgradeIdFilter,
        pageIndex, setPageIndex, pageSize, setPageSize,
        setStartDate,
        setEndDate,
        statusFilter, setStatusFilter,
    } = useVolunteerHistorical();

    const statusOptions = [
        { value: '', label: 'Todos los estados', isSelected: true },
        { value: '0', label: 'BAJA', isSelected: false },
        { value: '2', label: 'CUMPLIÓ', isSelected: false }
    ];

    return (
        <>
            <VolunteerHeader />
            <VolunteerHistoricalFilters
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
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                refetch={refetch}
                statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                statusOptions={statusOptions}
            />
            <VolunteerTable
                isLoading={isLoading} isFetching={isFetching} data={data} columns={columns}
                pageIndex={pageIndex} pageSize={pageSize}
                setPageIndex={setPageIndex} setPageSize={setPageSize} refetch={refetch}
                noItemsMessage="No existen voluntarios historicos" noItemsLinkText="Agregar nuevo voluntario" noItemsLinkUrl=""
            />
            {modalComponent}
        </>
    )
}