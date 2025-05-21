import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import Loader from "@/components/common/Loader";
import MedicalTreatmentForm from "@/components/medical/MedicalTreatmentForm";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useVolunteerDataContext } from "@/hooks/guard/querys/useVolunteersDataContext";
import { useMedicalTreatmentForm } from "@/hooks/medical/forms/useMedicalTreatmentForm";
import { useCreatedMedicalTreatment } from "@/hooks/medical/mutations/useCreatedMedicalTreatment";
import { MedicalTreatmentFormData } from "@/types/medicalTreatment.schema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateMedicalTreatmentView() {
    useBreadcrumb([{ label: "Tratamientos médicos", path: "/medical-treatment/list" }, { label: "Registrar tratamiento" }]);
    const goTo = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialValues: MedicalTreatmentFormData = {
        treatmentDate: "",
        diagnosis: "",
        description: "",
        attendingPersonId: 0,
        patientPersonId: 0
    };

    const { register, handleSubmit, formState: { errors }, control } = useMedicalTreatmentForm(initialValues);
    const mutation = useCreatedMedicalTreatment();

    const handleForm = async (formData: MedicalTreatmentFormData) => {
        setIsSubmitting(true);
        await mutation.mutateAsync(formData).catch(() => setIsSubmitting(false))
    }
    const { volunteersData, volunteersDataIsLoading } = useVolunteerDataContext();

    return (
        <form onSubmit={handleSubmit(handleForm)} noValidate>
            {(!volunteersDataIsLoading) ?
                <>
                    <fieldset disabled={isSubmitting}>
                        <MedicalTreatmentForm volunteersData={volunteersData} register={register} errors={errors} control={control} />
                    </fieldset>
                    <div className="p-6.5">
                        <ButtonGroup
                            buttons={[
                                { type: "button", label: "Registrar", onClick: handleSubmit(handleForm), variant: "primary", disabled: isSubmitting, isLoading: isSubmitting },
                                { type: "button", label: "Cancelar", onClick: () => { goTo("/medical-treatment/list") }, variant: 'secondary', disabled: isSubmitting }
                            ]}
                        />
                    </div>
                </>
                : <Loader message="Cargando datos previos" />
            }

        </form>
    )
}