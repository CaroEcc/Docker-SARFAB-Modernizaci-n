import { getShift } from "@/api/GuardAPI";
import { useQuery } from "@tanstack/react-query";


export function useShift() {
    const { data, isLoading } = useQuery({
        queryKey: ['shift'],
        queryFn: () => getShift(),
        retry: false,
    })

    return {
        shiftData: data,
        shiftDataIsLoading: isLoading
    };
}