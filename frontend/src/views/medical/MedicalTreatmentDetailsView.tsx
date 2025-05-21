import BackLink from "@/components/common/BackLink/BackLink";
import Loader from "@/components/common/Loader";
import EditMedicalTreatmentForm from "@/components/medical/EditMedicalTreatmentForm";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useVolunteerDataContext } from "@/hooks/guard/querys/useVolunteersDataContext";
import { useMedicalTreatmentForm } from "@/hooks/medical/forms/useMedicalTreatmentForm";
import { useGetMedicalTreatment } from "@/hooks/medical/querys/useGetMedicalTreatment";
import { MedicalTreatmentFormData } from "@/types/medicalTreatment.schema";
import { convertTodDataBaseFormatDate } from "@/utils/common/formatDate";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


export default function MedicalTreatmentDetailsView() {
    useBreadcrumb([{ label: "Tratamientos médicos", path: "/medical-treatment/list" }, { label: "Detalles de tratamiento" }]);
    const params = useParams();
    const medicalTreatmentId = params.medicalTreatmentId!;

    const { data, isLoading, isError } = useGetMedicalTreatment(Number(medicalTreatmentId));
    const { volunteersData, volunteersDataIsLoading } = useVolunteerDataContext();

    const { register, formState: { errors }, control, reset, watch } = useMedicalTreatmentForm(data as MedicalTreatmentFormData);

    useEffect(() => {
        if (data) {
            reset({
                ...data,
                treatmentDate: data.treatmentDate ? convertTodDataBaseFormatDate(data.treatmentDate) : ""
            });
        }
    }, [data, reset]);

    if (isLoading || volunteersDataIsLoading) return <Loader message="Cargando datos previos" />;
    if (isError) return 'Error';
    return (
        <div>
            <BackLink text="Volver a listado de tratamientos" iconSize={20} link="/medical-treatment/list" />
            <EditMedicalTreatmentForm volunteersData={volunteersData} register={register} errors={errors} control={control} readonly={true} watch={watch} />
        </div>
    );
}