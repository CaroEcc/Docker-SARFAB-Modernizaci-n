import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { userColumnDef as columns } from "@/constants/user/userColumnDef";
import { UserHeader } from "@/components/user/UserHeader";
import { UserTable } from "@/components/user/UserTable";
import { useGetUsers } from "@/hooks/user/querys/useGetUsers";
import { UserFilters } from "@/components/user/userFilter";

export default function UserListView() {
    useBreadcrumb([{ label: "Usuario", path: "administration/users" }, { label: "Listado de usuarios" }]);

    const {
        data, isLoading, refetch,
        searchValue, setSearchValue,
        status, setStatus,
        pageIndex, setPageIndex,
        pageSize, setPageSize,
        hasFilters
    } = useGetUsers();

    return (
        <>
            <UserHeader />
            <UserFilters
                searchValue={searchValue} setSearchValue={setSearchValue}
                status={status}
                setStatus={setStatus}
            />
            <UserTable
                isLoading={isLoading} data={data} columns={columns}
                pageIndex={pageIndex} pageSize={pageSize}
                setPageIndex={setPageIndex} setPageSize={setPageSize} refetch={refetch}
                hasFilters={hasFilters}
            />
        </>
    )
}