import { RiMapLine, RiUserStarLine } from "@remixicon/react";
import BackLink from "../common/BackLink/BackLink";
import FormDate from "../common/FormDate/FormDate";
import FormInput from "../common/FormInput/FormInput";
import FormSelect from "../common/FormSelect/FormSelect";
import { VolunteerFormProps } from "./types/VolunteerFormProps";
import { useGrades } from "@/hooks/grades/querys/useGrades";
import FormReadOnlyInput from "../common/FormReadOnlyInput/FormReadOnlyInput";

export default function VolunteerFormWithRecruit({ errors, register, control, recruit, setValue }: VolunteerFormProps) {

    const { data: grades } = useGrades();

    return (
        <>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">
                    <div className="col-span-2 row-span-2 col-start-4">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <BackLink
                                text="Volver al listado de voluntarios activos"
                                iconSize={20}
                                link="/volunteers/active-volunteers"
                            />
                            <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
                                Datos registrado previamente del recluta
                            </h3>
                            <p className="px-6.5 mt-3 text-sm dark:text-white font-thin text-black">Datos cargados desde el recluta</p>
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <FormReadOnlyInput label="Nombres" placeholder="Ingresa los nombres del voluntario"
                                            register={register}
                                            setValue={setValue}
                                            name="firstName"
                                            value={recruit?.firstName || ''} />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <FormReadOnlyInput label="Apellidos" placeholder="Ingresa los apellidos del voluntario"
                                            register={register}
                                            setValue={setValue}
                                            name="lastName"
                                            value={recruit?.lastName || ''} />
                                    </div>
                                </div>

                                <div className="mb-4.5">
                                    <FormReadOnlyInput label="Documento de identidad" placeholder="Ingresa el documento de identidad del voluntario"
                                        register={register}
                                        setValue={setValue}
                                        name="ci"
                                        value={recruit?.ci || ''} />
                                </div>

                                <div className="mb-4.5">
                                    <FormReadOnlyInput label="Fecha de nacimiento" placeholder="Ingresa la fecha de nacimiento del recluta"
                                        register={register}
                                        setValue={setValue}
                                        name="birthDate"
                                        value={recruit?.birthDate || ''} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 row-span-2 col-start-4">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
                                Datos personales
                            </h3>
                            <div className="p-6.5">
                                <div className="mb-4.5">
                                    <FormInput label="Correo electrónico" placeholder="Ingresa el correo del voluntario del voluntario"
                                        register={register}
                                        errors={errors}
                                        name="email"
                                        type="email" />
                                </div>

                                <div className="mb-4.5">
                                    <FormSelect
                                        label="Departamento"
                                        options={[{ id: 1, name: "Cochabamba" }]}
                                        control={control}
                                        name="departmentId"
                                        required
                                        icon={<RiMapLine size={20} />}
                                    />
                                </div>

                                <div className="mb-4.5">
                                    <FormInput label="Dirección" placeholder="Ingresa la dirección del voluntario"
                                        register={register}
                                        errors={errors}
                                        name="homeAddress"
                                        type="text" />
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <FormInput label="Teléfono" placeholder="Ingresa el teléfono del voluntario"
                                            register={register}
                                            errors={errors}
                                            name="phone"
                                            type="tel" />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <FormInput label="Número de celular" placeholder="Ingresa el celular del voluntario"
                                            register={register}
                                            errors={errors}
                                            name="mobilePhone"
                                            type="tel" />
                                    </div>
                                </div>

                                <div className="mb-4.5">
                                    <FormSelect
                                        label="Selecciona un grado"
                                        options={grades || []}
                                        control={control}
                                        name="gradeId"
                                        required
                                        icon={<RiUserStarLine size={20} />}
                                    />
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <FormInput label="Ocupación" placeholder="Estudiante, independiente, licenciado,  etc."
                                            register={register}
                                            errors={errors}
                                            name="occupation"
                                            type="text" />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <FormInput label="Religion" placeholder="Católico, adventista, cristiano, no practica, etc."
                                            register={register}
                                            errors={errors}
                                            name="religion"
                                            type="text" />
                                    </div>
                                </div>

                                <div className="mb-4.5">
                                    <FormInput label="Señas particulares" placeholder="Ingresa las señas particulares"
                                        register={register}
                                        errors={errors}
                                        name="distinctiveFeatures"
                                        type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-9">
                    <div className="col-span-2 row-span-2 col-start-4">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
                                En caso de emergencia
                            </h3>
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <FormInput label="Contacto de emergencia" placeholder="Contacto de emergencia del voluntario"
                                            register={register}
                                            errors={errors}
                                            name="emergencyContactFullName"
                                            type="text" />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <FormInput label="Parentezco" placeholder="Madre, padre, hermana, hermano, tio, etc."
                                            register={register}
                                            errors={errors}
                                            name="emergencyContactRelation"
                                            type="text" />
                                    </div>
                                </div>
                                <div className="mb-4.5">
                                    <FormInput label="Dirección del contacto" placeholder="Ingresa la dirección del contacto"
                                        register={register}
                                        errors={errors}
                                        name="emergencyContactAddress"
                                        type="text" />
                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <FormInput label="Telefono de contacto de emergancia" placeholder="Ingresa el teléfono de contacto de emergencia"
                                            register={register}
                                            errors={errors}
                                            name="emergencyContactPhone"
                                            type="text" />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <FormInput label="Celular de contacto de emergancia" placeholder="Ingresa el celular de contacto de emergencia"
                                            register={register}
                                            errors={errors}
                                            name="emergencyContactMobile"
                                            type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 col-start-4 row-start-3">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
                                Chequeo medico
                            </h3>
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <FormDate
                                            label="Fecha de realización del chequeo medico"
                                            placeholder="Ingresa la fecha en la que se realizó el reclutamiento"
                                            required
                                            register={register}
                                            name="checkupDate"
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <FormDate
                                            label="Fecha de caducidad del chequeo medico"
                                            placeholder="Ingres la fecha de caducidad del reclutamiento"
                                            required
                                            register={register}
                                            name="expirationDate"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4.5">
                                    <FormInput label="Observaciones" placeholder="Observaciones sobre el chequeo"
                                        register={register}
                                        errors={errors}
                                        name="observations"
                                        type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 col-start-4 row-start-4">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
                                Datos medicos
                            </h3>
                            <div className="p-6.5">
                                <div className="mb-4.5">
                                    <FormInput label="Alergias" placeholder="Antibioticos, nuez, picadura de abeja, etc."
                                        register={register}
                                        errors={errors}
                                        name="allergies"
                                        type="text" />
                                </div>
                                <div className="mb-4.5">
                                    <FormInput label="Grupo sanguineo" placeholder="A+, A-, B+, B-, AB+, AB-, O+, O-"
                                        register={register}
                                        errors={errors}
                                        name="bloodType"
                                        type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}