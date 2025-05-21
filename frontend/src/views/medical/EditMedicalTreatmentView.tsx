import { MedicalTreatmentAPIType } from "@/api/types/MedicalTreatmentAPIType.type";
import BackLink from "@/components/common/BackLink/BackLink";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import Loader from "@/components/common/Loader";
import EditMedicalTreatmentForm from "@/components/medical/EditMedicalTreatmentForm";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useVolunteerDataContext } from "@/hooks/guard/querys/useVolunteersDataContext";
import { useMedicalTreatmentForm } from "@/hooks/medical/forms/useMedicalTreatmentForm";
import { useEditMedicalTreatment } from "@/hooks/medical/mutations/useEditMedicalTreatment";
import { useGetMedicalTreatment } from "@/hooks/medical/querys/useGetMedicalTreatment";
import { MedicalTreatmentFormData } from "@/types/medicalTreatment.schema";
import { convertTodDataBaseFormatDate } from "@/utils/common/formatDate";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditMedicalTreatment() {
    useBreadcrumb([{ label: "Tratamientos médicos", path: "/medical-treatment/list" }, { label: "Editar tratamiento" }]);
    const goTo = useNavigate();

    const params = useParams();
    const medicalTreatmentId = params.medicalTreatmentId!;

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data, isLoading, isError } = useGetMedicalTreatment(Number(medicalTreatmentId));
    const { volunteersData, volunteersDataIsLoading } = useVolunteerDataContext();

    const mutation = useEditMedicalTreatment();

    const { register, handleSubmit, formState: { errors }, control, reset, watch } = useMedicalTreatmentForm(data as MedicalTreatmentFormData);

    useEffect(() => {
        if (data) {
            reset({
                ...data,
                treatmentDate: data.treatmentDate ? convertTodDataBaseFormatDate(data.treatmentDate) : ""
            });
        }
    }, [data, reset]);

    const handleForm = async (formData: MedicalTreatmentFormData) => {
        setIsSubmitting(true);

        const newData: MedicalTreatmentAPIType = {
            formData,
            medicalTreatmentId: Number(medicalTreatmentId) // Convertir a number
        };

        await mutation.mutateAsync(newData).catch(() => setIsSubmitting(false));
    };

    if (isLoading || volunteersDataIsLoading) return <Loader message="Cargando datos previos" />;
    if (isError) return 'Error';
    return (
        <div >
            <BackLink text="Volver a listado de tratamientos" iconSize={20} link="/medical-treatment/list" />
            <form onSubmit={handleSubmit(handleForm)} noValidate>
                <fieldset disabled={isSubmitting}>
                    <EditMedicalTreatmentForm volunteersData={volunteersData} register={register} errors={errors} control={control} readonly={false} watch={watch} />
                </fieldset>
                <div className="p-6.5">
                    <ButtonGroup
                        buttons={[
                            { type: "button", label: "Actualizar", onClick: handleSubmit(handleForm), variant: "primary", disabled: isSubmitting, isLoading: isSubmitting },
                            { type: "button", label: "Cancelar", onClick: () => { goTo("/medical-treatment/list") }, variant: 'secondary', disabled: isSubmitting }
                        ]}
                    />
                </div>
            </form>
        </div>
    );
}