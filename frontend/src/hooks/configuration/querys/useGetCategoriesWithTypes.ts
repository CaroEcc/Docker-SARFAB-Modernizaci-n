import { useQuery } from "@tanstack/react-query";
import { getCategoriesWithTypes } from "@/api/OperationAndTypesAPI";
import { OperationCategoryWithTypes } from "@/types/operationAndType.schema";
import { GetOperationCategoriesParams } from "@/api/types/OperationConfigAPIType.type";

export function useGetCategoriesWithTypes(params?: GetOperationCategoriesParams) {
  return useQuery<{ data: OperationCategoryWithTypes[]; totalPages: number }>({
    queryKey: ["categoriesWithTypes", params],
    queryFn: () => getCategoriesWithTypes(params),
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
