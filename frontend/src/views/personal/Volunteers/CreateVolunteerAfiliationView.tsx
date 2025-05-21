import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import Loader from "@/components/common/Loader";
import VolunteerForm from "@/components/volunteer/forms/VolunteerForm";
import VolunteerFormWithRecruit from "@/components/volunteer/forms/VolunteerFormWithRecruit";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useGrades } from "@/hooks/grades/querys/useGrades";
import { useRecruitData, useUpdateRecruitStatus } from "@/hooks/recruitment";
import { useVolunteerForm } from "@/hooks/volunteer";
import { useCreateVolunteer } from "@/hooks/volunteer/mutations/useCreateVolunteer";
import { VolunteerFormData } from "@/types/volunteer.schema";
import { useState } from "react";

export default function CreateVolunteerAfiliationView() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useBreadcrumb([{ label: "Voluntarios", path: "/volunteers/active-volunteers" }, { label: "Registrar afiliación de voluntario" }]);

  const queryParams = new URLSearchParams(location.search);
  const recruitId = queryParams.get('recruitId');

  // Función para obtener valores iniciales
  const getInitialValues = (): VolunteerFormData => ({
    firstName: "",
    lastName: "",
    homeAddress: "",
    ci: "",
    birthDate: "",
    phone: "",
    mobilePhone: "",
    email: "",
    distinctiveFeatures: "",
    volunteerType: "",
    occupation: "",
    bloodType: "",
    religion: "",
    allergies: "",
    emergencyContactFullName: "",
    emergencyContactRelation: "",
    emergencyContactAddress: "",
    emergencyContactPhone: "",
    emergencyContactMobile: "",
    departmentId: "",
    gradeId: "",
    checkupDate: "",
    expirationDate: "",
    observations: ""
  });

  const { register, handleSubmit, formState: { errors }, control, setValue } = useVolunteerForm(getInitialValues());
  const { data: grades, isLoading: isLoadingGrades, isError: isErrorGrades } = useGrades();

  const { mutate } = useUpdateRecruitStatus(false);
  const mutation = useCreateVolunteer();

  const { data: recruitData, isLoading, isError } = useRecruitData(recruitId);

  const handleForm = async (formData: VolunteerFormData) => {
    setIsSubmitting(true);
    try {
      await mutation.mutateAsync(formData);
      if (recruitId) {
        await mutate({ recruitId: Number(recruitId), status: 3 });
      }
    } catch (error) {
      console.error("Error al registrar voluntario", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    if (isLoadingGrades) return <Loader message="Cargando datos..." />;
    if (isErrorGrades) return <p>Error al cargar datos.</p>;
    if (!recruitId) {
      return (
        <>
          <form onSubmit={handleSubmit(handleForm)} noValidate>
            <fieldset disabled={isSubmitting}>
              <VolunteerForm errors={errors} register={register} control={control} grades={grades} />
            </fieldset>
            <ButtonGroup
              buttons={[
                {
                  type: "button",
                  label: "Registrar voluntario",
                  onClick: handleSubmit(handleForm),
                  variant: "primary",
                  disabled: isSubmitting,
                  isLoading: isSubmitting,
                },
                {
                  type: "link",
                  label: "Cancelar",
                  to: "/volunteers/active-volunteers",
                },
              ]}
            />
          </form>
        </>
      );
    }

    if (isLoading) return <Loader message="Cargando datos del recluta..." />;
    if (isError) return <p>Error al cargar los datos del recluta.</p>;

    return (
      <>
        <fieldset disabled={isSubmitting}>
          <VolunteerFormWithRecruit
            errors={errors}
            register={register}
            control={control}
            setValue={setValue}
            recruit={recruitData}
            typeVolunteer={recruitData.wantsMilitaryService ? 'Libretista' : 'Voluntario'}
            grades={grades}
          />
        </fieldset>
        <ButtonGroup
          buttons={[
            {
              type: "button",
              label: "Registrar voluntario",
              onClick: handleSubmit(handleForm),
              variant: "primary",
              disabled: isSubmitting,
              isLoading: isSubmitting,
            },
            {
              type: "link",
              label: "Cancelar",
              to: recruitId ? "/recruitment/approve-or-deny" : "/volunteers/active-volunteers",
            },
          ]}
        />
      </>
    );
  };

  return (
    <form onSubmit={handleSubmit(handleForm)} noValidate>
      {renderForm()}
    </form>
  );
}
