import FormDate from "@/components/common/FormDate/FormDate";
import FormInput from "@/components/common/FormInput/FormInput"

interface PersonalDataProps {
    data: any;
    lastCourse: any;
}

const PersonalData: React.FC<PersonalDataProps> = ({data, lastCourse}) => {
    return <>
        <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
            Datos personales
        </h3>
        <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                    <FormInput label="Nombres"
                        name="firstName"
                        type="text"
                        readonly
                        defaultValue={data.firstName}
                        className="bg-gray text-black dark:text-white" />
                </div>

                <div className="w-full xl:w-1/2">
                    <FormInput label="Apellidos"
                        name="lastName"
                        type="text"
                        readonly
                        defaultValue={data.lastName}
                        className="bg-gray text-black dark:text-white" />
                </div>
            </div>

            <div className="mb-4.5">
                <FormInput label="Documento de identidad"
                    name="ci"
                    type="text"
                    readonly
                    defaultValue={data.ci}
                    className="bg-gray text-black dark:text-white" />
            </div>

            <div className="mb-4.5">
                <FormDate
                    label="Fecha de nacimiento"
                    name="birthDate"
                    readonly
                    defaultValue={data.birthDate}
                    className="bg-gray text-black dark:text-white" />
            </div>

            <div className="mb-4.5">
                <FormInput label="Correo electronico"
                    name="email"
                    type="email"
                    readonly
                    defaultValue={data.email}
                    className="bg-gray text-black dark:text-white" />
            </div>

            <div className="mb-4.5">
                <FormInput
                    label="Departamento"
                    name="departmentId"
                    readonly
                    defaultValue={data.departmentName}
                    className="bg-gray text-black dark:text-white"
                />
            </div>

            <div className="mb-4.5">
                <FormInput label="Dirección"
                    name="homeAddress"
                    type="text"
                    readonly
                    defaultValue={data.homeAddress}
                    className="bg-gray text-black dark:text-white" />
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                    <FormInput label="Teléfono"
                        name="phone"
                        type="tel"
                        readonly
                        defaultValue={data.phone}
                        className="bg-gray text-black dark:text-white" />
                </div>

                <div className="w-full xl:w-1/2">
                    <FormInput label="Número de celular"
                        name="mobilePhone"
                        type="tel"
                        readonly
                        defaultValue={data.mobilePhone}
                        className="bg-gray text-black dark:text-white" />
                </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                    <FormInput
                        label="Selecciona un grado"
                        name="gradeName"
                        readonly
                        defaultValue={data.gradeName}
                        className="bg-gray text-black dark:text-white" />
                </div>

                <div className="w-full xl:w-1/2">
                    <FormInput
                        label="Tipo de voluntario"
                        name="volunteerType"
                        readonly
                        defaultValue={data.volunteerType}
                        className="bg-gray text-black dark:text-white" />
                </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                    <FormInput label="Ocupación"
                        name="occupation"
                        type="text" readonly
                        defaultValue={data.occupation}
                        className="bg-gray text-black dark:text-white" />
                </div>

                <div className="w-full xl:w-1/2">
                    <FormInput label="Religion"
                        name="religion"
                        type="text" readonly
                        defaultValue={data.religion}
                        className="bg-gray text-black dark:text-white" />
                </div>
            </div>

            <div className="mb-4.5">
                <FormInput label="Señas particulares"
                    name="distinctiveFeatures"
                    type="text" readonly
                    defaultValue={data.distinctiveFeatures}
                    className="bg-gray text-black dark:text-white" />
            </div>

            <div className="mb-4.5">
                <FormInput label="Último curso completado"
                    name="lastCourse"
                    type="text" readonly
                    defaultValue={lastCourse}
                    className="bg-gray text-black dark:text-white" />
            </div>
        </div>
    </>
}

export default PersonalData;