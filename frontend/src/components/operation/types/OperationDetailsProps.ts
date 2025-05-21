import { CreateOperationForm } from "@/types/operation.schema";
import { CreateOperationContext } from "@/types/operationContext.schema";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";

export interface OperationDetailsFormProps {
  errors: FieldErrors<CreateOperationForm>;
  register: UseFormRegister<CreateOperationForm>;
  control: Control<CreateOperationForm>;
  operationContext: CreateOperationContext | null;
}
