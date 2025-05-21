import { format } from "date-fns";
import FilterSearchBox from "../common/FilterSearchBox/FilterSearchBox";
import FilterRangeDates from "../common/FilterRangeDate/FilterRangeDates";
import FilterSelect from "../common/FilterSelect/FilterSelect";

export function GuardFilters({ shiftData, searchValue, setSearchValue, setStartDate, setEndDate, shift, setShift, status, setStatus, refetch }: GuardFiltersProp) {
    function handleRangeSelectAdapted(range: { startDate: string | undefined; endDate: string | undefined }): void {
        const parsedStart = range.startDate ? new Date(range.startDate) : undefined;
        const parsedEnd = range.endDate ? new Date(range.endDate) : undefined;
        handleRangeSelect({ startDate: parsedStart, endDate: parsedEnd });
    }

    function handleRangeSelect(range: { startDate: Date | undefined; endDate: Date | undefined }): void {
        setStartDate(range.startDate ? format(range.startDate, "yyyy-MM-dd") : undefined);
        setEndDate(range.endDate ? format(range.endDate, "yyyy-MM-dd") : undefined);
    }

    const statusOptions = [
        { id: 1, name: 'Programado' },
        { id: -1, name: 'Todos' },
        { id: 0, name: 'Finalizado' },
    ];

    const shiftOptions = [
        { id: -1, name: 'Todos' },
        ...shiftData.map((data: { shiftId: any; name: any; }) => ({
            id: data.shiftId,
            name: data.name
        }))
    ];

    return (
        <div className='flex flex-col gap-5.5 sm:flex-row mt-3'>
            <FilterSearchBox name='searchTerm' value={searchValue} onChange={setSearchValue} placeholder="Buscar por nombre" />
            <FilterSelect
                name="status"
                label="Seleccionar por estado"
                options={statusOptions.map(({ id, name }) => ({
                    value: id.toString(),
                    label: name,
                    isSelected: id === status
                }))}
                value={status?.toString() || statusOptions[0]?.id.toString()}
                onChange={(value) => setStatus(value ? Number(value) : statusOptions[0]?.id)}
            />
            <FilterSelect
                name="shift"
                label="Seleccionar por turno"
                options={shiftOptions.map(({ id, name }) => ({
                    value: id.toString(),
                    label: name,
                    isSelected: id === shift
                }))}
                value={shift?.toString() || shiftOptions[0]?.id.toString()}
                onChange={(value) => setShift(value ? Number(value) : shiftOptions[0]?.id)}
            />
            <FilterRangeDates onChange={handleRangeSelectAdapted} refetch={refetch} />
        </div>
    );
}