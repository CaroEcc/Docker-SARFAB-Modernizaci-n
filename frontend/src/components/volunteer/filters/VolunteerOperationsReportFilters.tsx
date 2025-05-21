import FilterRangeDates from "@/components/common/FilterRangeDate/FilterRangeDates";
import FilterSearchBox from "@/components/common/FilterSearchBox/FilterSearchBox";
import FilterSelect from "@/components/common/FilterSelect/FilterSelect";
import SortToggle from "@/components/common/SortToggle/SortToggle";
import { format } from "date-fns";
import { VolunteerOperationsReportFiltersProps } from "../types/VolunteerOperationsReportFiltersProps";

export function VolunteerOperationsReportFilters({ searchValue, setSearchValue,
    categoryFilter, setCategoryFilter, categoryOptions,
    setStartDate, setEndDate,
    orderByDateAsc, setOrderByDateAsc,
    refetch }: VolunteerOperationsReportFiltersProps) {

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
            <FilterSearchBox name='searchTerm' value={searchValue} onChange={setSearchValue} placeholder="Buscar por responsable o por lugar" />
            <FilterSelect name='category' label="Seleccionar categoria" options={categoryOptions} value={categoryFilter} onChange={setCategoryFilter} />
            <FilterRangeDates onChange={handleRangeSelectAdapted} refetch={refetch} />
            <SortToggle isAscending={orderByDateAsc} onToggle={() => setOrderByDateAsc(prev => !prev)} />
        </div>
    );
}