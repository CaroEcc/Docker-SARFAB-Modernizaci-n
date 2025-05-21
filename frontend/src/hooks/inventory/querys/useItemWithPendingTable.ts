import { useQuery } from '@tanstack/react-query';
import { getItemByIdWithPendingTable } from '@/api/InventoryAPI';
import { ItemWithPendingTable } from '@/types/invetory.schema';

export function useItemWithPendingTable(itemId: number) {
  return useQuery<ItemWithPendingTable>({
    queryKey: ['item-with-pending-table', itemId],
    queryFn: () => getItemByIdWithPendingTable(itemId),
    enabled: !!itemId,
  });
}
