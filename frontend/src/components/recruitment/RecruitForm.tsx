import ErrorFormMessage from "@/components/common/ErrorFormMessage/ErrorFormMessage";
import FormCheckbox from "@/components/common/FormCheckbox/FormCheckbox";
import FormDate from "@/components/common/FormDate/FormDate";
import FormInput from "@/components/common/FormInput/FormInput";
import { RecruitFormProps } from "@/components/recruitment/types/RecruitFormProps.types";

export default function RecruitForm({ errors, register, control }: RecruitFormProps) {

    return (
        <>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 mx-5">
                <div className="flex flex-col gap-9">
                    <div className="p-6.5">
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="flex flex-col">
                                <FormInput label="Nombres" placeholder="Ingresa los nombres" required
                                    register={register} 
                                    errors={errors}
                                    name="firstName"
                                    type="text"/>
                                {errors.firstName && (
                                    <ErrorFormMessage>{errors.firstName.message}</ErrorFormMessage>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <FormInput label="Apellidos" placeholder="Ingresa los apellidos" required
                                    register={register}
                                    name="lastName"
                                    type="text"/>
                                {errors.lastName && (
                                    <ErrorFormMessage>{errors.lastName?.message}</ErrorFormMessage>
                                )}
                            </div>
                        </div>
                        <div className="mb-4.5">
                            <div className="flex flex-col">
                                <FormInput label="Documento de identidad - C.I." placeholder="Ingresa el documento de identidad" required
                                    register={register}
                                    name="ci"
                                    type="text"
                                />
                                {errors.ci && (
                                    <ErrorFormMessage>{errors.ci?.message}</ErrorFormMessage>
                                )}
                            </div>
                        </div>
                        <div className="mb-4.5">
                            <div className="flex flex-col">
                                <FormDate
                                    label="Fecha de nacimiento"
                                    placeholder="Ingresa la fecha de nacimiento del recluta"
                                    required
                                    register={register}
                                    name="birthDate"
                                />
                                {errors.birthDate && (
                                    <ErrorFormMessage>{errors.birthDate.message}</ErrorFormMessage>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-9">
                    <div className="p-6.5">
                        <FormCheckbox
                            title="¿Desea optar por libreta militar?"
                            control={control}
                            register={register}
                            options={[
                                { label: "No, no opta por libreta de sevicio", value: false },
                                { label: "Si, si opta por libreta de sevicio", value: true }
                            ]}
                            required
                            
                            name="wantsMilitaryService"
                        />
                        {errors.wantsMilitaryService && (
                            <ErrorFormMessage>{errors.wantsMilitaryService?.message}</ErrorFormMessage>
                        )} 
                    </div>
                </div>
            </div>
        </>
    )
}