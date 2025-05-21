import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import { getMilitary } from "@/api/MilitaryAPI";
import { MilitaryFilters } from "@/hooks/types/militaryTypes";

const fetchMilitary = async ({ queryKey }: QueryFunctionContext<[string, MilitaryFilters]>) => {
  const [, filters] = queryKey;

  const fixedFilters = {
    ...filters,
    status: filters.status ? Number(filters.status) : undefined,
    rankId: filters.rankId ?? undefined,
  };

  return getMilitary(fixedFilters);
};


export function useFetchMilitary(filters: MilitaryFilters) {
  return useQuery({
    queryKey: ["military", filters],
    queryFn: fetchMilitary,
    retry: false,
  });
}
