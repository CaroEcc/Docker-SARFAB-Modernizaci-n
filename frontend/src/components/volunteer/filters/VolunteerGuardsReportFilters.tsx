import FilterRangeDates from "@/components/common/FilterRangeDate/FilterRangeDates";
import FilterSearchBox from "@/components/common/FilterSearchBox/FilterSearchBox";
import FilterSelect from "@/components/common/FilterSelect/FilterSelect";
import { format } from "date-fns";

export function VolunteerGuardsReportFilters({ searchValue, setSearchValue,
    statusFilter, setStatusFilter, statusOptions,
    shiftFilter, setShiftFilter, shiftOptions,
    setStartDate, setEndDate,
    refetch }: VolunteerGuardsReportFiltersProps) {

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
            <FilterSearchBox name='searchTerm' value={searchValue} onChange={setSearchValue} placeholder="Buscar por comandante de guardia o por el lugar de la guardia" />
            <FilterSelect name='status' label="Seleccionar estado" options={statusOptions} value={statusFilter} onChange={setStatusFilter} />
            <FilterSelect name='shift' label="Seleccionar turno" options={shiftOptions} value={shiftFilter} onChange={setShiftFilter} />
            <FilterRangeDates onChange={handleRangeSelectAdapted} refetch={refetch} />
        </div>
    );
}