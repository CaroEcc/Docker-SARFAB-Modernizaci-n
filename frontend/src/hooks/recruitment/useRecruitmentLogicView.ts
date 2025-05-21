import { useState, useEffect } from 'react';
import { useRecruitment } from '@/hooks/recruitment';

export const useRecruitmentLogic = () => {
  const { data, isLoading, refetch } = useRecruitment({ initialStatusFilter: '1' });
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('1');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    refetch();
  }, [searchValue, statusFilter, pageIndex, pageSize, refetch]);

  return {
    data,
    isLoading,
    searchValue,
    setSearchValue,
    statusFilter,
    setStatusFilter,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
  };
};
