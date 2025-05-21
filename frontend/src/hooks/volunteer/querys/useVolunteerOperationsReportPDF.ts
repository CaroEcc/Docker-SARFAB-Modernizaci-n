import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllVolunteerOperationsForReport } from '@/api/VolunteerAPI';
interface UseVolunteerOperationsReportPDFOptions {
  initialVolunteerId?: number;
  initialSearchValue?: string;
  initialCategoryFilter?: string;
  initialStartDateValue?: string;
  initialEndDateValue?: string;
  initialOrderByDateAsc?: boolean;
}
export function useVolunteerOperationsReportPDF({
    initialVolunteerId,
    initialSearchValue = "",
    initialCategoryFilter = "",
    initialStartDateValue = '',
    initialEndDateValue = '',
    initialOrderByDateAsc = true,
}: UseVolunteerOperationsReportPDFOptions = {}) {
    const [searchValue, setSearchValue] = useState(initialSearchValue);
    const [categoryFilter, setCategoryFilter] = useState(initialCategoryFilter);
    const [startDate, setStartDate] = useState(initialStartDateValue);
    const [endDate, setEndDate] = useState(initialEndDateValue);
    const [orderByDateAsc, setOrderByDateAsc] = useState(initialOrderByDateAsc);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['volunteerOperationReportPDF', initialVolunteerId, {
            searchTerm: searchValue, categoryId: categoryFilter, 
            startDate, endDate, orderByDateAsc
        }],
        queryFn: () => getAllVolunteerOperationsForReport(Number(initialVolunteerId), {
            searchTerm: searchValue, categoryId: categoryFilter, 
            startDate, endDate, orderByDateAsc
        }),
        enabled: !!initialVolunteerId,
    });

    return {
        data,
        isLoading,
        refetch,
        searchValue,
        setSearchValue,
        categoryFilter,
        setCategoryFilter,
        setStartDate,
        setEndDate,
        orderByDateAsc,
        setOrderByDateAsc
    };
}