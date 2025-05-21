import { getUserById } from "@/api/UserAPI";
import { useQuery } from "@tanstack/react-query";

export function useGetUserById(userId: number) {
    return useQuery({
        queryKey: ['getUserById', userId],
        queryFn: () => getUserById(userId),
        retry: false
    });
}