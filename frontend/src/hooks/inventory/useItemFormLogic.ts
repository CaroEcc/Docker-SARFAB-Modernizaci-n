import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  CreateItemForm,
  UpdateItemForm,
  CreateItemSchema,
} from "@/types/invetory.schema";
import { useItemById } from "@/hooks/inventory/querys/useItemById";
import { useCreateItem } from "@/hooks/inventory/mutations/useCreateItem";
import { useUpdateItem } from "@/hooks/inventory/mutations/useUpdateItem";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

interface UseItemFormLogicProps {
  isOpen: boolean;
  onClose: () => void;
  itemId?: number;
}

export function useItemFormLogic({ isOpen, onClose, itemId }: UseItemFormLogicProps) {
  const isEditMode = !!itemId;

  const form = useForm<CreateItemForm>({
    resolver: zodResolver(CreateItemSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      quantity: undefined,
    },
  });

  const queryClient = useQueryClient();
  const { data: itemData, isLoading: isItemLoading } = useItemById(itemId || 0);

  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem();

  const assignedQuantity = isEditMode && itemData
    ? itemData.assignedQuantity || 0
    : 0;

  useEffect(() => {
    if (!isOpen) {
      form.reset({
        name: "",
        quantity: undefined,
      });
      return;
    }

    if (isEditMode && itemData) {
      form.reset({
        name: itemData.name,
        quantity: itemData.quantity,
      });
    } else {
      form.reset({
        name: "",
        quantity: undefined,
      });
    }
  }, [isOpen, isEditMode, itemData, form]);

  const handleFormSubmit = async (formData: CreateItemForm) => {
    try {
      if (isEditMode && assignedQuantity > 0 && formData.quantity !== undefined) {
        if (formData.quantity < assignedQuantity) {
          toast.error(
            `La cantidad no puede ser menor a la cantidad asignada (${assignedQuantity})`
          );
          return;
        }
      }

      if (isEditMode) {
        await updateMutation.mutateAsync({
          id: itemId!,
          formData: formData as UpdateItemForm,
        });
        toast.success("Elemento actualizado correctamente");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Elemento creado correctamente");
      }
      queryClient.invalidateQueries({ queryKey: ["inventory-items"] });

      if (isEditMode && itemId) {
        queryClient.invalidateQueries({ queryKey: ["item-with-pending-table", itemId] });
        queryClient.invalidateQueries({ queryKey: ["item", itemId] });
      }

      setTimeout(() => {
        onClose();
      }, 50);
    } catch (error) {
      console.error("Error en la operación:", error);
      toast.error("Ocurrió un error al procesar la solicitud");
    }
  };

  return {
    isLoading: isItemLoading,
    handleFormSubmit,
    formProps: {
      form,
    },
    assignedQuantity: isEditMode ? assignedQuantity : undefined,
  };
}
