import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { UpdateOperationForm } from "@/types/operation.schema";
import { OperationDetailResponse } from "@/types/operation.schema";
import { VolunteerWithRank, MilitaryWithRank } from "@/types/operationContext.schema";

export interface EditOperationPersonnelFormProps {
  operation?: OperationDetailResponse;
  volunteers: VolunteerWithRank[];
  military: MilitaryWithRank[];
  register: UseFormRegister<UpdateOperationForm>;
  errors: FieldErrors<UpdateOperationForm>;
  setValue: UseFormSetValue<UpdateOperationForm>;
}
