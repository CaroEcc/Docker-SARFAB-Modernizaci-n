import FormInput from "@/components/common/FormInput/FormInput";

interface MedicalDataProps {
    data: any;
}

const MedicalData: React.FC<MedicalDataProps> = ({ data }) => {
    return <>
        <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
            Datos medicos
        </h3>
        <div className="p-6.5">
            <div className="mb-4.5">
                <FormInput label="Alergias"
                    name="allergies"
                    type="text"
                    readonly
                    defaultValue={data.allergies}
                    className="bg-gray text-black dark:text-white" />
            </div>
            <div className="mb-4.5">
                <FormInput label="Grupo sanguineo"
                    name="bloodType"
                    type="text"
                    readonly
                    defaultValue={data.bloodType}
                    className="bg-gray text-black dark:text-white" />
            </div>
        </div>
    </>
}

export default MedicalData;