
import { format } from "date-fns";
import FilterRangeDates from "../common/FilterRangeDate/FilterRangeDates";
import FilterSearchBox from "../common/FilterSearchBox/FilterSearchBox";

export function MedicalTreatmentFilters({ searchValue, setSearchValue, setStartDate, setEndDate, refetch }: MedicalTreatmentFiltersProp) {

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
            <FilterSearchBox name='searchTerm' value={searchValue} onChange={setSearchValue} placeholder="Buscar por nombre" />
            <FilterRangeDates onChange={handleRangeSelectAdapted} refetch={refetch} />
        </div>
    );
}