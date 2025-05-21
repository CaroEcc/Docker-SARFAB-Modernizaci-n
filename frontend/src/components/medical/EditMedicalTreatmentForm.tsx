import ErrorFormMessage from "@/components/common/ErrorFormMessage/ErrorFormMessage";
import FormDate from "@/components/common/FormDate/FormDate";
import FormTextArea from "../common/FormTextArea/FormTextArea";
import { EditMedicalTreatmentFormProps } from "./types/EditMedicalTreatmentFormProps.types";
import FormSearchableSelect from "../common/FormSearchableSelect/FormSearchableSelect";

export default function EditMedicalTreatmentForm({ volunteersData, errors, register, control, readonly, watch }: EditMedicalTreatmentFormProps) {
    const volunteersOptions = volunteersData?.map((data) => ({
        id: data.volunteerId,
        name: `${data.lastName} ${data.firstName}, ${data.abbreviation} `
    }));
    return (
        <>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 mx-5 items-start">
                <div className="h-auto gap-4 rounded-xl p-4 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <h3 className="my-3 dark:text-white text-2xl font-semibold text-black">
                        Datos generales
                    </h3>
                    <div className="mb-4.5 flex flex-col">
                        <FormDate label="Fecha en la que se otorgó la atención" placeholder="Selecciona la fecha" required
                            register={register}
                            name="treatmentDate"
                            defaultValue={watch("treatmentDate")}
                            readonly={readonly} />
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
                            defaultValue={watch("attendingPersonId")}
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
                            defaultValue={watch("patientPersonId")}
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
                            className="h-70"
                            defaultValue={watch('diagnosis')}
                            readonly={readonly} />
                        {errors.diagnosis && (
                            <ErrorFormMessage>{errors.diagnosis?.message}</ErrorFormMessage>
                        )}
                    </div>
                    <div>
                        <FormTextArea label="Descripción" placeholder="Descripción" required
                            register={register}
                            errors={errors}
                            name="description"
                            defaultValue={watch('description')}
                            className="h-70"
                            readonly={readonly} />
                        {errors.description && (
                            <ErrorFormMessage>{errors.description?.message}</ErrorFormMessage>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}