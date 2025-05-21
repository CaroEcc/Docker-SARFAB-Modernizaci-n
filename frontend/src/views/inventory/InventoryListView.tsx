import { useSearchParams } from "react-router-dom";
import { InventoryListComponent } from "@/components/inventory/InventoryListComponent";
import { InventoryColumnsDef as columns } from "@/constants/inventory/InventoryColumnsDef";
import { ItemFormModal } from "@/components/inventory/modals/ItemFormModal";
import { ItemMovementModal } from "@/components/inventory/modals/ItemMovementModal";
import { useExtractItem } from "@/hooks/inventory/mutations/useExtractItem";
import { useReturnItem } from "@/hooks/inventory/mutations/useReturnItem";
import { useItemById } from "@/hooks/inventory/querys/useItemById";
import { useEffect, useState } from "react";
import { Item } from "@/types/invetory.schema";
import { useQueryClient } from "@tanstack/react-query";


export default function InventoryListView() {
  const [searchParams, setSearchParams] = useSearchParams();

  const openItemModal = searchParams.get("openItemModal") === "true";
  const itemId = Number(searchParams.get("itemId"));
  const { data: selectedItem } = useItemById(itemId);
  const [, setCachedItem] = useState<Item | null>(null);

  const handleCloseItemModal = () => {
    searchParams.delete("openItemModal");
    searchParams.delete("itemId");
    setSearchParams(searchParams);
  };

  const openMovementModal = searchParams.get("openItemMovementModal") === "true";
  const isReturn = searchParams.get("isReturn") === "true";

  const extractItemMutation = useExtractItem();
  const returnItemMutation = useReturnItem();

  const handleCloseMovementModal = () => {
    searchParams.delete("openItemMovementModal");
    searchParams.delete("itemId");
    searchParams.delete("isReturn");
    setSearchParams(searchParams);
  };
  const queryClient = useQueryClient();
  useEffect(() => {
    if (selectedItem) setCachedItem(selectedItem);
  }, [selectedItem]);  

  return (
    <>
      <InventoryListComponent
        breadcrumb={[
          { label: "Inventario", path: "/inventory/list" },
          { label: "Lista de inventario" },
        ]}
        columns={columns}
      />

      <ItemFormModal
        isOpen={openItemModal}
        onClose={handleCloseItemModal}
        itemId={itemId}
      />
     <ItemMovementModal
        isOpen={openMovementModal}
        onClose={handleCloseMovementModal}
        itemId={itemId}
        isReturn={isReturn}
        isLoading={
          isReturn ? returnItemMutation.isPending : extractItemMutation.isPending
        }
        onSubmit={async (data) => {
          if (isReturn) {
            await returnItemMutation.mutateAsync(data);
          } else {
            await extractItemMutation.mutateAsync(data);
          }
          queryClient.invalidateQueries({ queryKey: ["inventory-items"] });
          handleCloseMovementModal();
        }}
      />
    </>
  );
}
