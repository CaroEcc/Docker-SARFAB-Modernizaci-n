import { getVolunteersWithGrade } from "@/api/OperationContextAPI";
import { useQuery } from "@tanstack/react-query";

export function useVolunteerDataContext() {
    const { data, isLoading } = useQuery({
        queryKey: ['GuardContextData'],
        queryFn: () => getVolunteersWithGrade(),
        retry: false,
    })

    return {
        volunteersData: data,
        volunteersDataIsLoading: isLoading
    };
}