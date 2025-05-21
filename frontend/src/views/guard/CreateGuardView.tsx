import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import Loader from "@/components/common/Loader";
import CreateGuardForm from "@/components/guard/CreateGuardForm";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useGuardForm } from "@/hooks/guard/forms/useGuardForm";
import { useCreatedGuard } from "@/hooks/guard/mutations/useCreatedGuard";
import { useShift } from "@/hooks/guard/querys/useShift";
import { useVolunteerDataContext } from "@/hooks/guard/querys/useVolunteersDataContext";
import { GuardFormData } from "@/types/guard.schema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateGuardView() {
    const goTo = useNavigate();
    useBreadcrumb([{ label: "GUARDIAS", path: "/guards/list" }, { label: "Registrar guardia" }]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [voluntareeIds, setVoluntareeIds] = useState<number[]>([]);

    const initialValues: GuardFormData = {
        guardDate: '',
        shiftId: 0,
        responsibleId: 0,
        location: '',
        voluntareeIds: []
    };

    const { register, handleSubmit, formState: { errors }, control, setError } = useGuardForm(initialValues);
    const mutation = useCreatedGuard();

    const { shiftData, shiftDataIsLoading } = useShift();
    const { volunteersData, volunteersDataIsLoading } = useVolunteerDataContext();

    const handleForm = async (formData: GuardFormData) => {
        setIsSubmitting(true);

        if (voluntareeIds.length === 0) {
            setError('voluntareeIds', { type: 'manual', message: 'Debe añadir voluntarios a la guardia' });
            setIsSubmitting(false);
            return;
        }

        if (voluntareeIds.some((v) => v === formData.responsibleId)) {
            setError('responsibleId', { type: 'manual', message: 'El responsable no puede estar en la lista de voluntarios' });
            setIsSubmitting(false);
            return;
        }

        formData.voluntareeIds = voluntareeIds;
        await mutation.mutateAsync(formData).catch(() => setIsSubmitting(false));
    };

    return (
        <form onSubmit={handleSubmit(handleForm)} noValidate>
            {
                (!shiftDataIsLoading && !volunteersDataIsLoading) ?
                    <>
                        <fieldset disabled={isSubmitting}>
                            <CreateGuardForm setVoluntareeIds={setVoluntareeIds} volunteersData={volunteersData} shiftData={shiftData} register={register} errors={errors} control={control} />
                        </fieldset>
                        <div className="p-6.5">
                            <ButtonGroup
                                buttons={[
                                    { type: "button", label: "Registrar guardia", onClick: handleSubmit(handleForm), variant: "primary", disabled: isSubmitting, isLoading: isSubmitting },
                                    { type: "button", label: "Cancelar", onClick: () => { goTo("/guards/list") }, variant: 'secondary', disabled: isSubmitting }
                                ]}
                            />
                        </div>
                    </>
                    :
                    <Loader message="Cargando datos previos" />
            }
        </form>
    );
}