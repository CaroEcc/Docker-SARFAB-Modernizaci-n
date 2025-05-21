import { RiIdCardLine } from "@remixicon/react";
import FormInput from "../common/FormInput/FormInput";
import FormDate from "../common/FormDate/FormDate";
import { RecruitDetailsProps } from "./types/RecruitDetailsProps.types";

export default function RecruitDetails({ recruit }: RecruitDetailsProps) {
    return (
        <>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <FormInput
                    label="Nombres"
                    name="firstName"
                    type="text"
                    readonly
                    defaultValue={recruit.firstName}
                    className="bg-gray text-black dark:text-white"
                />
                <FormInput
                    label="Apellidos"
                    name="lastName"
                    type="text"
                    readonly
                    defaultValue={recruit.lastName}
                    className="bg-gray text-black dark:text-white"
                />
            </div>

            <div className="mb-5.5">
                <FormInput
                    label="Documento de identidad - C.I."
                    name="ci"
                    type="text"
                    readonly
                    defaultValue={recruit.ci}
                    className="bg-gray text-black dark:text-white"
                    icon={<RiIdCardLine />}
                />
            </div>
            <div className="mb-5.5">
                <FormDate
                    label="Fecha de nacimiento"
                    name="birthDate"
                    readonly
                    defaultValue={recruit.birthDate}
                    className="bg-gray text-black dark:text-white"
                />
            </div>
            <div className="mb-5.5">
                <FormInput
                    label="¿Desea realizar el servicio militar?"
                    name="wantsMilitaryService"
                    type="text"
                    readonly
                    defaultValue={recruit.wantsMilitaryService ? "Sí" : "No"}
                    className="bg-gray text-black dark:text-white"
                />
            </div>
        </>
    );
}
