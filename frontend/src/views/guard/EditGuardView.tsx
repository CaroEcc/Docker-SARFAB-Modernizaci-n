import { UpdateGuardAPIType } from "@/api/types/GuardAPIType.type";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import Loader from "@/components/common/Loader";
import EditGuardForm from "@/components/guard/EditGuardForm";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useGuardForm } from "@/hooks/guard/forms/useGuardForm";
import { useUpdateGuard } from "@/hooks/guard/mutations/useUpdateGuard";
import { useGetGuard } from "@/hooks/guard/querys/useGetGuard";
import { useShift } from "@/hooks/guard/querys/useShift";
import { useVolunteerDataContext } from "@/hooks/guard/querys/useVolunteersDataContext";
import { GuardFormData, VoluntareeGuard } from "@/types/guard.schema";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditGuardView() {
    useBreadcrumb([{ label: "GUARDIAS", path: "/guards/list" }, { label: "Editar guardia" }]);
    const goTo = useNavigate();
    const params = useParams();
    const guardId = params.guardId!;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [voluntaries, setVoluntaries] = useState<VoluntareeGuard[]>([]);

    const { data, isLoading, isError } = useGetGuard(Number(guardId));
    const mutation = useUpdateGuard();


    const { register, formState: { errors }, control, reset, watch, setError, handleSubmit } = useGuardForm({
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

    const handleForm = async (formData: GuardFormData) => {
        setIsSubmitting(true);

        if (voluntaries.length === 0) {
            setError('voluntareeIds', { type: 'manual', message: 'Debe añadir voluntarios a la guardia' });
            setIsSubmitting(false);
            return;
        }

        if (voluntaries.some((v) => v.voluntareeId === formData.responsibleId)) {
            setError('responsibleId', { type: 'manual', message: 'El responsable no puede estar en la lista de voluntarios' });
            setIsSubmitting(false);
            return;
        }

        formData.voluntareeIds = voluntaries.map((v) => v.voluntareeId);

        const newData: UpdateGuardAPIType = {
            formData,
            guardId: Number(guardId)
        };

        await mutation.mutateAsync(newData).catch(() => setIsSubmitting(false));
    };

    if (isLoading || shiftDataIsLoading || volunteersDataIsLoading) return <Loader message="Cargando datos previos" />;
    if (isError) return 'Error';
    return (
        <form onSubmit={handleSubmit(handleForm)} noValidate>
            <fieldset disabled={isSubmitting}>
                <EditGuardForm register={register} errors={errors} control={control} readonly={false} watch={watch} volunteersData={volunteersData} shiftData={shiftData} voluntaries={voluntaries} setVoluntaries={setVoluntaries} />
            </fieldset>
            <div className="p-6.5">
                <ButtonGroup
                    buttons={[
                        { type: "button", label: "Actualizar guardia", onClick: handleSubmit(handleForm), variant: "primary", disabled: isSubmitting, isLoading: isSubmitting },
                        { type: "button", label: "Cancelar", onClick: () => { goTo("/guards/list") }, variant: 'secondary', disabled: isSubmitting }
                    ]}
                />
            </div>
        </form>
    );
}