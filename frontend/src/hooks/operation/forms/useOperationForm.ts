import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  CreateOperationForm,
  CreateOperationSchemaWithValidation,
} from "@/types/operation.schema";
import {
  getCreateOperationContext,
  getVolunteersWithGrade,
  getMilitaryWithRank,
} from "@/api/OperationContextAPI";
import {
  CreateOperationContext,
  VolunteerWithRankList,
  MilitaryWithRankList,
} from "@/types/operationContext.schema";

export function useOperationForm(defaultValues: CreateOperationForm) {
  const form = useForm<CreateOperationForm>({
    defaultValues,
    resolver: zodResolver(
      CreateOperationSchemaWithValidation
        .refine((data) => data.responsible.personId !== 0, {
          message: "Debe seleccionar un responsable.",
          path: ["responsible"],
        })
        .refine((data) => data.personnel.length > 0, {
          message: "Debe agregar al menos un voluntario o personal militar.",
          path: ["personnel"],
        })
    ),
  });

  const [operationContext, setOperationContext] =
    useState<CreateOperationContext | null>(null);
  const [volunteers, setVolunteers] = useState<VolunteerWithRankList>([]);
  const [military, setMilitary] = useState<MilitaryWithRankList>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [contextData, volunteersData, militaryData] = await Promise.all([
          getCreateOperationContext(),
          getVolunteersWithGrade(),
          getMilitaryWithRank(),
        ]);
        setOperationContext(contextData);
        setVolunteers(volunteersData);
        setMilitary(militaryData);
      } catch (error) {
        console.error("Error loading form data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    ...form,
    setValue: form.setValue,
    operationContext,
    volunteers,
    military,
    isLoading,
  };
}
