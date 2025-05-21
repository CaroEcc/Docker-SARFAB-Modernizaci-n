import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { VolunteerTable } from "../table/VolunteerTable";
import { useVolunteerGuardsReport } from "@/hooks/volunteer/querys/useVolunteerGuardsReport";
import { VolunteerGuardsReportFilters } from "../filters/VolunteerGuardsReportFilters";
import { useParams } from "react-router-dom";
import BackLink from "@/components/common/BackLink/BackLink";
import Button from "@/components/common/Button/Button";
import { useDownloadGuardVolunteerReport } from "@/hooks/reports/useDownloadGuardVolunteerReport";

export default function VolunteerGuardsReport({ breadcrumb, columns }: VolunteerListViewProps) {
    useBreadcrumb(breadcrumb);
    const { volunteerId } = useParams();

    const {
        data, isLoading, refetch, isFetching, searchValue, setSearchValue,
        statusFilter, setStatusFilter,
        shiftFilter, setShiftFilter,
        startDate, setStartDate,
        endDate, setEndDate,
        pageIndex,
        setPageIndex,
        pageSize,
        setPageSize
    } = useVolunteerGuardsReport({ initialVolunteerId: Number(volunteerId) });

    const { downloadReport, isDownloading } = useDownloadGuardVolunteerReport();

    const handleDownload = () => {
        if (!volunteerId) return;
        downloadReport({
            volunteerId: Number(volunteerId),
            filters: {
                query: searchValue,
                status: statusFilter,
                shift: shiftFilter,
                startDate,
                endDate,
            },
        });
    };

    return (
        <>
            <div className="bg-white dark:bg-boxdark rounded-lg border border-stroke shadow-default dark:border-strokedark p-4 mb-4">
                <BackLink
                    text="Volver atrás"
                    iconSize={20}
                    link="/volunteers"
                    useRouter={true}
                />
                <nav>
                    <Button variant='primary' label="Descargar reporte" classname="mt-2" onClick={handleDownload} isLoading={isDownloading} disabled={isDownloading} />
                </nav>
                <VolunteerGuardsReportFilters
                    searchValue={searchValue} setSearchValue={setSearchValue}
                    statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                    statusOptions={[
                        { value: "", label: "Todos los estados", isSelected: true },
                        { value: "0", label: "Pendiente", isSelected: false },
                        { value: "1", label: "Completado", isSelected: false },
                        { value: "2", label: "Falta", isSelected: false }
                    ]}
                    shiftFilter={shiftFilter} setShiftFilter={setShiftFilter}
                    shiftOptions={[
                        { value: "", label: "Todos los turnos", isSelected: true },
                        { value: "1", label: "Mañana", isSelected: false },
                        { value: "2", label: "Tarde", isSelected: false },
                        { value: "3", label: "Noche", isSelected: false }
                    ]}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    refetch={refetch}
                />
                <VolunteerTable
                    isLoading={isLoading} isFetching={isFetching} data={data} columns={columns}
                    pageIndex={pageIndex} pageSize={pageSize}
                    setPageIndex={setPageIndex} setPageSize={setPageSize} refetch={refetch}
                    noItemsMessage="No existen registros de guardias"
                    noItemsLinkText="Agregar guardia"
                    noItemsLinkUrl="/guards/create"
                />
            </div>
        </>
    )
}