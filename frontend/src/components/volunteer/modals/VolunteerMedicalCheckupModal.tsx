import Button from "@/components/common/Button/Button";
import ErrorFormMessage from "@/components/common/ErrorFormMessage/ErrorFormMessage";
import FormDate from "@/components/common/FormDate/FormDate";
import FormInput from "@/components/common/FormInput/FormInput";
import Modal from "@/components/common/Modal/Modal";
import { useVolunteerMedicalCheckupForm } from "@/hooks/volunteerMedicalCheckup/forms/useVolunteerMedicalCheckupForm";
import { useCreateVolunteerMedicalCheckup } from "@/hooks/volunteerMedicalCheckup/mutations/useCreateVolunteerMedicalCheckup";
import { MedicalCheckupVolunteerFormData } from "@/types/volunteerMedicalCheckup";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VolunteerMedicalCheckupModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const volunteerId = Number(queryParams.get("volunteerId"));
  const isOpen = !!queryParams.get("add-medical-checkup");

  const initialValues = {
    volunteerId,
    checkupDate: "",
    expirationDate: "",
    observations: "",
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useVolunteerMedicalCheckupForm(initialValues);

  const { mutateAsync } = useCreateVolunteerMedicalCheckup();

  useEffect(() => {
    if (isOpen) {
      reset(initialValues);
    }
  }, [isOpen, volunteerId, reset]);

  const handleClose = () => {
    navigate(location.pathname, { replace: true });
  };

  const handleForm = async (formData: MedicalCheckupVolunteerFormData) => {
    setIsSubmitting(true);
    try {
      await mutateAsync(formData);
      handleClose();
    } catch (error) {
      console.error("Error al asignar el chequeo médico", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal title="Agregar nuevo chequeo médico" isOpen={isOpen} onClose={handleClose}>
      <p className="text-lg font-thin text-gray-600 mb-6">
        Parece que quieres asignar un nuevo chequeo médico a este voluntario.
        <span className="text-body font-semibold"> Llena los datos respectivos</span> para agregar un nuevo chequeo médico.
      </p>

      <form onSubmit={handleSubmit(handleForm)} noValidate>
        <fieldset disabled={isSubmitting}>
          <input type="text" hidden {...register("volunteerId")} />

          <FormDate
            label="Fecha de realización del chequeo médico"
            placeholder="Ingresa la fecha en la que se realizó el chequeo"
            required
            register={register}
            name="checkupDate"
          />
          {errors.checkupDate && <ErrorFormMessage>{errors.checkupDate.message}</ErrorFormMessage>}

          <FormDate
            label="Fecha de caducidad del chequeo médico"
            placeholder="Ingresa la fecha de caducidad del chequeo"
            required
            register={register}
            name="expirationDate"
          />
          {errors.expirationDate && <ErrorFormMessage>{errors.expirationDate.message}</ErrorFormMessage>}

          <FormInput
            label="Observaciones"
            placeholder="Observaciones sobre el chequeo"
            register={register}
            errors={errors}
            name="observations"
            type="text"
          />
          {errors.observations && <ErrorFormMessage>{errors.observations.message}</ErrorFormMessage>}
        </fieldset>
        <div className="flex justify-end gap-4.5 mt-6">
          <Button
            label={isSubmitting ? "Procesando..." : "Agregar chequeo médico"}
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          />
          <button
            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            onClick={handleClose}
            type="button"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}
