import { useMilitaryFilters } from "./filters/useMilitaryFilters";
import { useFetchMilitary } from "./querys/useFetchMilitary";
import { useFetchMilitaryRanks } from "./querys/useFetchMilitaryRanks";
import { UseMilitaryOptions } from "@/hooks/types/militaryTypes";

export function useMilitary(options: UseMilitaryOptions = {}) {
  const filters = useMilitaryFilters(options);

  const { data, isLoading, refetch } = useFetchMilitary(filters);
  const { rankOptions, isRanksLoading, rankOptionsForForms } = useFetchMilitaryRanks();

  return {
    ...filters,
    data,
    isLoading,
    refetch,
    rankOptions,
    isRanksLoading,
    rankOptionsForForms,
  };
}
