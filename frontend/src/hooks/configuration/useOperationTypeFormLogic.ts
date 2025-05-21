import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreateOperationTypeForm, UpdateOperationTypeForm } from "@/types/operationAndType.schema";
import { useCreateOperationType } from "./mutations/useCreateOperationType";
import { useUpdateOperationType } from "./mutations/useUpdateOperationType";
import { useGetOperationCategories } from "./querys/useGetOperationCategories";
import { FilterOption } from "@/components/common/FilterDatalist/FilterDatalist.type";

const operationTypeFormSchema = z.object({
  name: z.string().min(1, "El nombre del tipo de operación es obligatorio").max(100, "El nombre del tipo de operación debe tener máximo 100 caracteres"),
  operationCategoryId: z.number().min(1, "Debe seleccionar una categoría de operación")
});

type FormValues = z.infer<typeof operationTypeFormSchema>;

interface UseOperationTypeFormLogicProps {
  isOpen: boolean;
  typeId?: number;
  typeData?: { name: string; operationCategoryId: number };
  onClose: () => void;
}

export function useOperationTypeFormLogic({
  isOpen,
  typeId,
  typeData,
  onClose,
}: UseOperationTypeFormLogicProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");
  const createType = useCreateOperationType();
  const updateType = useUpdateOperationType();
  const { data: categories = [], isLoading: isLoadingCategories, refetch } = useGetOperationCategories();

  const categoryOptions: FilterOption[] = categories.map(category => ({
    id: category.operationCategoryId,
    name: category.name
  }));

  const form = useForm<FormValues>({
    resolver: zodResolver(operationTypeFormSchema),
    defaultValues: { 
      name: "",
      operationCategoryId: 0
    },
  });

  const { reset, setValue } = form;

  useEffect(() => {
    if (isOpen) {
      if (typeId && typeData) {
        reset({ 
          name: typeData.name,
          operationCategoryId: typeData.operationCategoryId
        });
        
        const categoryName = categories.find(
          c => c.operationCategoryId === typeData.operationCategoryId
        )?.name || "";
        
        setSelectedCategoryName(categoryName);
      } else {
        reset({ name: "", operationCategoryId: 0 });
        setSelectedCategoryName("");
      }
    }
  }, [isOpen, typeId, typeData, categories, reset]);

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategoryName(value);
    const selectedCategory = categories.find(category => category.name === value);
    setValue("operationCategoryId", selectedCategory?.operationCategoryId || 0);
  };

  const handleFormSubmit = async (data: CreateOperationTypeForm) => {
    try {
      setIsLoading(true);
      if (typeId) {
        await updateType.mutateAsync({
          id: typeId,
          formData: data as UpdateOperationTypeForm,
        });
      } else {
        await createType.mutateAsync(data);
      }
      await refetch();
      onClose();
    } catch (error) {
      console.error("Error al guardar el tipo de operación:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading: isLoading || isLoadingCategories,
    handleFormSubmit,
    formProps: {
      form,
    },
    categoryOptions,
    selectedCategoryName,
    handleCategoryChange
  };
}
