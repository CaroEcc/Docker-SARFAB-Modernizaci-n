import { Control, UseFormRegister, FieldErrors } from "react-hook-form";
import { UpdateOperationForm } from "@/types/operation.schema";
import { OperationDetailResponse } from "@/types/operation.schema";
import { CreateOperationContext } from "@/types/operationContext.schema";

export interface EditOperationFormProps {
  operation?: OperationDetailResponse;
  operationContext?: CreateOperationContext | null;
  register: UseFormRegister<UpdateOperationForm>;
  control: Control<UpdateOperationForm>;
  errors: FieldErrors<UpdateOperationForm>;
}
