import { useState } from "react";
import { useGetCourses } from "./querys/useGetCourses";

interface UseCoursesProps {
  initialSearchValue?: string;
}

export function useCourses({ initialSearchValue = "" }: UseCoursesProps = {}) {
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { 
    data,
    isLoading,
    refetch
  } = useGetCourses({
    courseName: searchValue,
    page: pageIndex,
    pageSize
  });

  return {
    data: data?.data || [],
    totalPages: data?.totalPages || 0,
    totalRecords: data?.totalRecords || 0,
    isLoading,
    refetch,
    searchValue,
    setSearchValue,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize
  };
}
