import { GuardTable } from "@/components/guard/GuardTable";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { guardColumnDef as columns } from "@/constants/guard/GuardColumnDef";
import { GuardHeader } from "@/components/guard/GuardHeader";
import { useGuard } from "@/hooks/guard/querys/useGuard";
import { GuardFilters } from "@/components/guard/GuardFilters";
import { useShift } from "@/hooks/guard/querys/useShift";

export default function GuardView() {
    useBreadcrumb([{ label: "Guardias", path: "/guards/list" }, { label: "Listado de guardias" }]);

    const {
        data, isLoading, refetch,
        searchValue, setSearchValue,
        setStartDate,
        setEndDate,
        shift, setShift,
        status, setStatus,
        pageIndex, setPageIndex,
        pageSize, setPageSize,
        hasFilters
    } = useGuard();

    const { shiftData, shiftDataIsLoading: shiftDataisLoading } = useShift()

    return (
        <>
            <GuardHeader />
            {!shiftDataisLoading &&
                <GuardFilters
                    shiftData={shiftData}
                    searchValue={searchValue} setSearchValue={setSearchValue}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    shift={shift}
                    status={status}
                    setShift={setShift}
                    setStatus={setStatus}
                    refetch={refetch}
                />
            }
            <GuardTable
                isLoading={isLoading} data={data} columns={columns}
                pageIndex={pageIndex} pageSize={pageSize}
                setPageIndex={setPageIndex} setPageSize={setPageSize} refetch={refetch} hasFilters={hasFilters}
            />
        </>
    )
}