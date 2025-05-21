import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreateOperationCategoryForm, UpdateOperationCategoryForm } from "@/types/operationAndType.schema";
import { useCreateOperationCategory } from "./mutations/useCreateOperationCategory";
import { useUpdateOperationCategory } from "./mutations/useUpdateOperationCategory";
import { useQueryClient } from "@tanstack/react-query";

const categoryFormSchema = z.object({
  name: z.string().min(1, "El nombre de la categoría es obligatorio").max(100, "El nombre de la categoría debe tener máximo 100 caracteres"),
});

type FormValues = z.infer<typeof categoryFormSchema>;

interface UseOperationCategoryFormLogicProps {
  isOpen: boolean;
  categoryId?: number;
  categoryData?: { name: string };
  onClose: () => void;
}

export function useOperationCategoryFormLogic({
  isOpen,
  categoryId,
  categoryData,
  onClose,
}: UseOperationCategoryFormLogicProps) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const createCategory = useCreateOperationCategory();
  const updateCategory = useUpdateOperationCategory();
  const form = useForm<FormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: { name: "" },
  });

  const { reset } = form;

  useEffect(() => {
    if (isOpen) {
      if (categoryId && categoryData) {
        reset({ name: categoryData.name });
      } else {
        reset({ name: "" });
      }
    }
  }, [isOpen, categoryId, categoryData, reset]);

  const handleFormSubmit = async (data: CreateOperationCategoryForm) => {
    try {
      setIsLoading(true);
      if (categoryId) {
        await updateCategory.mutateAsync({
          id: categoryId,
          formData: data as UpdateOperationCategoryForm,
        });
      } else {
        await createCategory.mutateAsync(data);
      }
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["operation-categories"],
      });
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleFormSubmit,
    formProps: {
      form,
    },
  };
}
