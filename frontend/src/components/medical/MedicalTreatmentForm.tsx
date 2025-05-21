import ErrorFormMessage from "@/components/common/ErrorFormMessage/ErrorFormMessage";
import FormDate from "@/components/common/FormDate/FormDate";
import { MedicalTreatmentFormProps } from "./types/MedicalTreatmentFormProps.types";
import FormTextArea from "../common/FormTextArea/FormTextArea";
import BackLink from "../common/BackLink/BackLink";
import FormSearchableSelect from "../common/FormSearchableSelect/FormSearchableSelect";

export default function MedicalTreatmentForm({ volunteersData, errors, register, control }: MedicalTreatmentFormProps) {
    const volunteersOptions = volunteersData?.map((data) => ({
        id: data.volunteerId,
        name: `${data.lastName} ${data.firstName}, ${data.abbreviation} `
    }));
    return (
        <>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 mx-5 items-start">
                <div className="h-auto gap-4 rounded-xl p-4 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <BackLink
                        text="Volver a listado de tratamientos"
                        iconSize={20}
                        link="/medical-treatment/list"
                    />
                    <h3 className="my-3 dark:text-white text-2xl font-semibold text-black">
                        Datos generales
                    </h3>
                    <div className="mb-4.5 flex flex-col">
                        <FormDate label="Fecha en la que se otorgó la atención" placeholder="Selecciona la fecha" required
                            register={register}
                            name="treatmentDate" />
                        {errors.treatmentDate && (
                            <ErrorFormMessage>{errors.treatmentDate.message}</ErrorFormMessage>
                        )}
                    </div>
                    <div className="mb-4.5 flex flex-col">
                        <FormSearchableSelect
                            name="attendingPersonId"
                            label="Persona que atendió"
                            options={volunteersOptions && volunteersOptions.length > 0
                                ? volunteersOptions
                                : [{ id: 0, name: "No hay opciones" }]}
                            control={control}
                        />
                        {errors.attendingPersonId && (
                            <ErrorFormMessage>{errors.attendingPersonId.message}</ErrorFormMessage>
                        )}
                    </div>
                    <div className="mb-4.5 flex flex-col">
                        <FormSearchableSelect
                            name="patientPersonId"
                            label="Persona que recibió el tratamiento"
                            options={volunteersOptions && volunteersOptions.length > 0
                                ? volunteersOptions
                                : [{ id: 0, name: "No hay opciones" }]}
                            control={control}
                        />
                        {errors.patientPersonId && (
                            <ErrorFormMessage>{errors.patientPersonId.message}</ErrorFormMessage>
                        )}
                    </div>
                </div>
                <div className="gap-4 p-4 rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <h3 className="my-3 dark:text-white text-2xl font-semibold text-black">
                        Diagnostico y tratamiento
                    </h3>
                    <div className="mb-4.5">
                        <FormTextArea label="Diagnóstico" placeholder="Diagnóstico" required
                            register={register}
                            errors={errors}
                            name="diagnosis"
                            className="h-60" />
                        {errors.diagnosis && (
                            <ErrorFormMessage>{errors.diagnosis?.message}</ErrorFormMessage>
                        )}
                    </div>
                    <div>
                        <FormTextArea label="Descripción del tratamiento dado" placeholder="Tratamiento" required
                            register={register}
                            errors={errors}
                            name="description"
                            className="h-60" />
                        {errors.description && (
                            <ErrorFormMessage>{errors.description?.message}</ErrorFormMessage>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}