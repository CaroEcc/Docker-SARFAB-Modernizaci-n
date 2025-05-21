import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import Loader from "@/components/common/Loader";
import AttendanceControlGuard from "@/components/guard/AttendanceGuard";
import { FinalizeGuardModal } from "@/components/guard/FinalizeGuardModal";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useEndGuardForm } from "@/hooks/guard/forms/useEndGuardForm";
import { useGetGuard } from "@/hooks/guard/querys/useGetGuard";
import { VolunteerAttendance } from "@/types/guard.schema";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AttendanceControlGuardView() {
    useBreadcrumb([{ label: "GUARDIAS", path: "/guards/list" }, { label: "Detalles de guardia" }]);
    const goTo = useNavigate();
    const params = useParams();
    const guardId = params.guardId!;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [volunteerAttendances, setVolunteerAttendances] = useState<VolunteerAttendance[]>([]);

    const { data, isLoading, isError } = useGetGuard(Number(guardId));

    const { formState: { errors }, setError, handleSubmit } = useEndGuardForm({
        guardId: 0,
        observations: '',
        volunteerAttendances: []
    });

    const onClose = () => {
        setIsModalOpen(false)
        setIsSubmitting(false)
    }

    const handleForm = async () => {
        setIsSubmitting(true);

        if (data) {
            if (data.voluntareeGuards.length != volunteerAttendances.length) {
                setError('volunteerAttendances', {
                    type: 'manual',
                    message: 'Debes registrar todas las asistencias antes de finalizar la guardia'
                });
                setIsSubmitting(false);
                return;
            }
        }
        setIsModalOpen(true)
    };

    if (isLoading) return <Loader message="Cargando datos previos" />;
    if (isError) return 'Error';
    return (
        <>
            <form onSubmit={handleSubmit(handleForm)} noValidate>
                <fieldset disabled={isSubmitting}>
                    <AttendanceControlGuard data={data} volunteerAttendances={volunteerAttendances} setVolunteerAttendances={setVolunteerAttendances} errors={errors} />
                </fieldset>
                <div className="p-6.5">
                    <ButtonGroup
                        buttons={[
                            { type: "button", label: "Finalizar guardia", onClick: handleSubmit(handleForm), variant: "primary", disabled: isSubmitting, isLoading: isSubmitting },
                            { type: "button", label: "Cancelar", onClick: () => { goTo("/guards/list") }, variant: 'secondary', disabled: isSubmitting }
                        ]}
                    />
                </div>
            </form>
            <FinalizeGuardModal isOpen={isModalOpen} onClose={onClose} guardId={Number(guardId)} volunteerAttendance={volunteerAttendances} />
        </>
    );
}