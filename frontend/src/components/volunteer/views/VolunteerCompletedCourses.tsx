import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useVolunteerCompletedCourses } from "@/hooks/courseVolunteer/querys/useVolunteerCompletedCourses";
import { VolunteerTable } from "../table/VolunteerTable";
import { useParams } from "react-router-dom";
import BackLink from "@/components/common/BackLink/BackLink";
import Button from "@/components/common/Button/Button";
import { useDownloadCompleteCoursesReport } from "@/hooks/reports/useDownloadCompleteCoursesReport";

export default function VolunteerCompletedCourses({ columns }: VolunteerCourseListViewProps) {
    const { volunteerId } = useParams();
    const volunteerIdString = volunteerId || '';
    useBreadcrumb([{ label: "Voluntarios", path: `/volunteers/${volunteerIdString}/view` }, { label: "Cursos finalizados" }]);

    const {
        data,
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
        pageIndex,
        setPageIndex,
        pageSize,
        setPageSize,
    } = useVolunteerCompletedCourses({ volunteerId: volunteerIdString });

    const { downloadReport, isDownloading } = useDownloadCompleteCoursesReport();

    const handleDownload = () => {
        if (!volunteerId) return;
        downloadReport({
            volunteerId: Number(volunteerId),
            filters: {},
        });
    };

    if (isError) {
        const errorMessage =
            typeof error === "object" && error !== null && "message" in error
                ? (error as any).message
                : "Error al cargar los cursos finalizados. Intenta nuevamente.";

        return (
            <div className="text-red-500 text-center p-4">
                {errorMessage}
            </div>
        );
    }
    return (
        <>
            <div className="bg-white dark:bg-boxdark rounded-lg border border-stroke shadow-default dark:border-strokedark p-4 mb-4">
                <BackLink
                    text="Volver al listado de voluntarios"
                    iconSize={20}
                    link={`/volunteers/${volunteerIdString}/view`}
                    useRouter={true}
                />
                <nav>
                    <Button variant='primary' label="Descargar reporte" classname="mt-2" onClick={handleDownload} isLoading={isDownloading} disabled={isDownloading} />
                </nav>
                <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
                    Cursos finalizados
                </h3>
                <VolunteerTable
                    isLoading={isLoading} isFetching={isFetching} data={data} columns={columns}
                    pageIndex={pageIndex} pageSize={pageSize}
                    setPageIndex={setPageIndex} setPageSize={setPageSize} refetch={refetch}
                    noItemsMessage="No existen cursos finalizados" noItemsLinkText="" noItemsLinkUrl={``}
                />
            </div>
        </>
    )
}