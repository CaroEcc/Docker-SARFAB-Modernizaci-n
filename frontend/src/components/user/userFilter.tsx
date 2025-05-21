import FilterSearchBox from "../common/FilterSearchBox/FilterSearchBox";
import FilterSelect from "../common/FilterSelect/FilterSelect";

interface UserFiltersProp {
    searchValue: string;
    setSearchValue: (value: string) => void;
    status: number;
    setStatus: (value: number) => void;
}

export function UserFilters({ searchValue, setSearchValue, status, setStatus }: UserFiltersProp) {

    const statusOptions = [
        { id: -1, name: 'Todos' },
        { id: 1, name: 'Habilitado' },
        { id: 0, name: 'Deshabilitado' },
    ];

    return (
        <div className='flex flex-col gap-5.5 sm:flex-row mt-3'>
            <FilterSearchBox name='searchTerm' value={searchValue} onChange={setSearchValue} placeholder="Buscar por nombre de usuario o nombre completo" />
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
        </div>
    );
}