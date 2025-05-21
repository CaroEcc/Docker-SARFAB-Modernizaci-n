import { MilitaryWithRankList } from "@/types/operationContext.schema";
import { CreateUserFormDataSchema } from "@/types/user.schema";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import FormSearchableSelect from "../common/FormSearchableSelect/FormSearchableSelect";
import ErrorFormMessage from "../common/ErrorFormMessage/ErrorFormMessage";
import FormInput from "../common/FormInput/FormInput";

interface CreateUserFormPorps {
    militarsData: MilitaryWithRankList | undefined;
    errors: FieldErrors<CreateUserFormDataSchema>;
    register: UseFormRegister<CreateUserFormDataSchema>;
    control: Control<CreateUserFormDataSchema>;
}

export default function CreateUserForm({ militarsData, errors, register, control }: CreateUserFormPorps) {
    const militariesOptions = militarsData?.map((data) => ({
        id: data.militaryId,
        name: `${data.lastName} ${data.firstName}, ${data.abbreviation} `
    }));

    return (
        <>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 mx-5 items-start">
                <div className="mb-4.5 flex flex-col w-full md:flex-1">
                    <FormSearchableSelect
                        name="personId"
                        label="Selecciona a la persona"
                        options={militariesOptions && militariesOptions.length > 0
                            ? militariesOptions
                            : [{ id: 0, name: "No hay opciones" }]}
                        control={control}
                    />
                    {errors.personId && (
                        <ErrorFormMessage>{errors.personId.message}</ErrorFormMessage>
                    )}
                </div>
                <div className="mb-4.5 flex flex-col">
                    <FormInput register={register} label="Nombre de usuario o código de militar" required
                        placeholder="Ingresa el nombre de usuario"
                        name="userName" />
                    {errors.userName && (
                        <ErrorFormMessage>{errors.userName.message}</ErrorFormMessage>
                    )}
                </div>
                <div className="mb-4.5 flex flex-col">
                    <FormInput register={register} label="Correo electrónico institucional" required
                        placeholder="Ingresa el correo electrónico"
                        name="email" />
                    {errors.email && (
                        <ErrorFormMessage>{errors.email.message}</ErrorFormMessage>
                    )}
                </div>
            </div>
        </>
    )
}