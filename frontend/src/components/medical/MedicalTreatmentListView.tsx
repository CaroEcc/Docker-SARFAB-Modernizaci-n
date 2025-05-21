import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useMedicalTreatment } from "@/hooks/medical/querys/useMedicalTreatment";
import { MedicalTreatmentTable } from "./MedicalTreatmenTable";
import { MedicalTreatmentHeader } from "./MedicalHeader";
import { MedicalTreatmentFilters } from "./MedicalTreatmentFilters";

export default function MedicalTreatmentListView({ breadcrumb, columns }: MedicalListViewProps) {
    useBreadcrumb(breadcrumb);

    const {
        data, isLoading, refetch,
        searchValue, setSearchValue,
        setStartDate,
        setEndDate,
        pageIndex, setPageIndex,
        pageSize, setPageSize, hasFilters
    } = useMedicalTreatment();

    return (
        <>
            <MedicalTreatmentHeader />
            <MedicalTreatmentFilters
                searchValue={searchValue} setSearchValue={setSearchValue}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                refetch={refetch}
            />
            <MedicalTreatmentTable
                isLoading={isLoading} data={data} columns={columns}
                pageIndex={pageIndex} pageSize={pageSize}
                setPageIndex={setPageIndex} setPageSize={setPageSize} refetch={refetch} hasFilters={hasFilters}
            />
        </>
    )
}