import FilterRangeDates from "@/components/common/FilterRangeDate/FilterRangeDates";
import FilterSearchBox from "@/components/common/FilterSearchBox/FilterSearchBox";
import FilterSelect from "@/components/common/FilterSelect/FilterSelect";
import { format } from "date-fns";

export function VolunteerHistoricalFilters({ searchValue, setSearchValue, gradeIdFilter, setgradeIdFilter,
    gradeIdOptions, setStartDate, setEndDate, refetch,
    statusFilter, setStatusFilter, statusOptions }: VolunteerHistoricalFiltersProps) {

    function handleRangeSelectAdapted(range: { startDate: string | undefined; endDate: string | undefined }): void {
        const parsedStart = range.startDate ? new Date(range.startDate) : undefined;
        const parsedEnd = range.endDate ? new Date(range.endDate) : undefined;
        handleRangeSelect({ startDate: parsedStart, endDate: parsedEnd });
    }

    function handleRangeSelect(range: { startDate: Date | undefined; endDate: Date | undefined }): void {
        setStartDate(range.startDate ? format(range.startDate, "yyyy-MM-dd") : undefined);
        setEndDate(range.endDate ? format(range.endDate, "yyyy-MM-dd") : undefined);
    }

    return (
        <div className='flex flex-col gap-5.5 sm:flex-row mt-3'>
            <FilterSearchBox name='searchTerm' value={searchValue} onChange={setSearchValue} placeholder="Buscar por nombres o apellidos" />
            <FilterSelect name='gradeId' label="Seleccionar grado" options={gradeIdOptions} value={gradeIdFilter} onChange={setgradeIdFilter} />
            <FilterSelect name='status' label="Seleccionar estado" options={statusOptions} value={statusFilter} onChange={setStatusFilter} />
            <FilterRangeDates onChange={handleRangeSelectAdapted} refetch={refetch} />
        </div>
    );
}