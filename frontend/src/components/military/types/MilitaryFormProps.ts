import { UseFormReturn } from "react-hook-form";
import { CreateMilitaryForm } from "@/types/index";

export interface MilitaryFormProps {
    form: UseFormReturn<CreateMilitaryForm>;
    onSubmit: (data: CreateMilitaryForm) => void;
    rankOptions: { label: string; value: number }[];
    isLoading: boolean;
    onClose: () => void;
    militaryId?: number; 
}
