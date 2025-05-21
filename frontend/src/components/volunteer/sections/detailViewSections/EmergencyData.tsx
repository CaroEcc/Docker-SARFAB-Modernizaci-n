import FormInput from "@/components/common/FormInput/FormInput";

interface EmergencyDataProps {
    data: any;
}

const EmergencyData: React.FC<EmergencyDataProps> = ({data}) => {
    return <>
        <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
            En caso de emergencia
        </h3>
        <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                    <FormInput label="Contacto de emergencia"
                        name="emergencyContactFullName"
                        type="text"
                        readonly
                        defaultValue={data.emergencyContactFullName}
                        className="bg-gray text-black dark:text-white" />
                </div>

                <div className="w-full xl:w-1/2">
                    <FormInput label="Parentezco"
                        name="emergencyContactRelation"
                        type="text"
                        readonly
                        defaultValue={data.emergencyContactRelation}
                        className="bg-gray text-black dark:text-white" />
                </div>
            </div>
            <div className="mb-4.5">
                <FormInput label="Dirección del contacto"
                    name="emergencyContactAddress"
                    type="text"
                    readonly
                    defaultValue={data.emergencyContactAddress}
                    className="bg-gray text-black dark:text-white" />
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                    <FormInput label="Telefono de contacto de emergancia"
                        name="emergencyContactPhone"
                        type="text"
                        readonly
                        defaultValue={data.emergencyContactPhone}
                        className="bg-gray text-black dark:text-white" />
                </div>

                <div className="w-full xl:w-1/2">
                    <FormInput label="Celular de contacto de emergancia"
                        name="emergencyContactMobile"
                        type="text"
                        readonly
                        defaultValue={data.emergencyContactMobile}
                        className="bg-gray text-black dark:text-white" />
                </div>
            </div>
        </div>
    </>
}

export default EmergencyData;