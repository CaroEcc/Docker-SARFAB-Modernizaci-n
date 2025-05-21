import { useQuery } from "@tanstack/react-query";
import { getMilitaryRanks } from "@/api/MilitaryAPI";
import { useMemo } from "react";
import { RankOption } from "@/hooks/types/militaryTypes";

const fetchMilitaryRanks = async (): Promise<RankOption[]> => {
  const ranks = await getMilitaryRanks();
  return Array.isArray(ranks) ? ranks : [];
};

export function useFetchMilitaryRanks() {
  const { data: rankOptions = [], isLoading: isRanksLoading } = useQuery<RankOption[]>({
    queryKey: ["militaryRanks"],
    queryFn: fetchMilitaryRanks,
    placeholderData: [],
    retry: false,
  });

  const rankOptionsForForms = useMemo(() => 
    rankOptions.map(rank => ({ value: rank.value, label: rank.label })), 
    [rankOptions]
  );

  return { rankOptions, isRanksLoading, rankOptionsForForms };
}
