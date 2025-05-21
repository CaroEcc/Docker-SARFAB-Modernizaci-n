import FilterSearchBox from "@/components/common/FilterSearchBox/FilterSearchBox";
interface CourseFiltersProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
}

export function CourseFilters({ searchValue, setSearchValue }: CourseFiltersProps) {
    return (
        <div className="flex flex-col gap-4 mb-4">
            <div className="grid gap-2">
                <div className="relative">
                    <FilterSearchBox
                        name="searchCourse"
                        placeholder="Buscar por nombre del curso"
                        value={searchValue}
                        onChange={setSearchValue}
                        className="pl-8"
                    />
                </div>
            </div>
        </div>
    );
}
