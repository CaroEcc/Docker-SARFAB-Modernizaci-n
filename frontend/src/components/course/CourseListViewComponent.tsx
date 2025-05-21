import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { CourseFilters } from "./CourseFilters";
import { CourseHeader } from "./CourseHeader";
import { CourseTable } from "./CourseTable";
import { useCourses } from "@/hooks/courses/useCourses";
import { ColumnDef } from "@tanstack/react-table";
import { Course } from "@/types/courses.schema";
import { ReactNode } from "react";

interface CourseListViewComponentProps {
  breadcrumb: { label: string; path?: string }[];
  columns: ColumnDef<Course, any>[];
  modalComponent?: ReactNode;
  initialSearchValue?: string;
  onOpenCourseModal: () => void;
}

export function CourseListViewComponent({
  breadcrumb,
  columns,
  modalComponent,
  initialSearchValue,
  onOpenCourseModal
}: CourseListViewComponentProps) {
  useBreadcrumb(breadcrumb);

  const {
    data,
    totalPages,
    totalRecords,
    isLoading,
    refetch,
    searchValue,
    setSearchValue,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize
  } = useCourses({ initialSearchValue });

  const hasFilters = !!(searchValue);

  return (
    <>
      <CourseHeader onOpenCourseModal={onOpenCourseModal} />
      <CourseFilters
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <CourseTable
        isLoading={isLoading}
        data={data}
        totalPages={totalPages}
        totalRecords={totalRecords}
        columns={columns}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
        refetch={refetch}
        hasFilters={hasFilters}
      />
      {modalComponent}
    </>
  );
}
