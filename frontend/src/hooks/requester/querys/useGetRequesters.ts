import { useQuery } from "@tanstack/react-query";
import { getRequesters } from "@/api/RequesterAPI";
import { RequesterType } from "@/types/requester.schema";

interface GetRequestersParams {
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}
export function useGetRequesters(params?: GetRequestersParams) {
  const { searchTerm, page = 1, pageSize = 10 } = params || {};
  
  return useQuery<{ data: RequesterType[]; totalPages: number }>({
    queryKey: ["requesters", searchTerm, page, pageSize],
    queryFn: () => getRequesters(searchTerm, page, pageSize),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
