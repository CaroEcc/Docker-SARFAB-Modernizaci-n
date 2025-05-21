import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { RequesterFilters } from "./RequesterFilters";
import { RequesterTable } from "./RequesterTable";
import { useRequester } from "@/hooks/requester";
import { RequesterListViewProps } from "./types/RequesterListViewProps";

export default function RequesterListComponent({ breadcrumb, columns }: RequesterListViewProps) {
  useBreadcrumb(breadcrumb);

  const {
    data, refetch, searchValue,
    setSearchValue, pageIndex, setPageIndex,
    pageSize, setPageSize, isLoading
  } = useRequester();

  const hasFilters = searchValue !== "";

  return (
    <>
      <RequesterFilters
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <RequesterTable
        data={data}
        columns={columns}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
        refetch={refetch}
        isLoading={isLoading}
        hasFilters={hasFilters}
      />
    </>
  );
}