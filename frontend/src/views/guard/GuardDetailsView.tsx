import Loader from "@/components/common/Loader";
import EditGuardForm from "@/components/guard/EditGuardForm";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useGuardForm } from "@/hooks/guard/forms/useGuardForm";
import { useGetGuard } from "@/hooks/guard/querys/useGetGuard";
import { useShift } from "@/hooks/guard/querys/useShift";
import { useVolunteerDataContext } from "@/hooks/guard/querys/useVolunteersDataContext";
import { VoluntareeGuard } from "@/types/guard.schema";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function GuardDetailsView() {
    useBreadcrumb([{ label: "GUARDIAS", path: "/guards/list" }, { label: "Detalles de guardia" }]);
    const params = useParams();
    const guardId = params.guardId!;

    const [voluntaries, setVoluntaries] = useState<VoluntareeGuard[]>([]);

    const { data, isLoading, isError } = useGetGuard(Number(guardId));

    const { register, formState: { errors }, control, reset, watch } = useGuardForm({
        guardDate: data?.guardDate,
        shiftId: data?.shiftId,
        responsibleId: data?.responsibleId,
        location: data?.location,
        voluntareeIds: data?.voluntareeGuards.map((v) => v.voluntareeId)
    });

    const { shiftData, shiftDataIsLoading } = useShift();
    const { volunteersData, volunteersDataIsLoading } = useVolunteerDataContext();

    useEffect(() => {
        if (data) {
            reset({
                guardDate: data.guardDate,
                shiftId: data.shiftId,
                responsibleId: data.responsibleId,
                location: data.location,
                voluntareeIds: data.voluntareeGuards.map((v) => v.voluntareeId)
            });
            setVoluntaries(data.voluntareeGuards)
        }
    }, [data, reset]);

    if (isLoading || shiftDataIsLoading || volunteersDataIsLoading) return <Loader message="Cargando datos previos" />;
    if (isError) return 'Error';
    return (
        <EditGuardForm register={register} errors={errors} control={control} readonly={true} watch={watch} volunteersData={volunteersData} shiftData={shiftData} voluntaries={voluntaries} setVoluntaries={setVoluntaries} />
    );
}