import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { CreateOperationForm } from "@/types/operation.schema";
import { MilitaryWithRankList, VolunteerWithRankList } from "@/types/operationContext.schema";

export interface OperationPersonnelFormProps {
  errors: FieldErrors<CreateOperationForm>;
  setValue: UseFormSetValue<CreateOperationForm>;
  military: MilitaryWithRankList;
  volunteers: VolunteerWithRankList;
}
