import { UpdateUserFormDataSchema, UserSchema } from "@/types/user.schema";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import ErrorFormMessage from "../common/ErrorFormMessage/ErrorFormMessage";
import FormInput from "../common/FormInput/FormInput";

interface UpdateUserFormPorps {
    data: UserSchema | undefined;
    errors: FieldErrors<UpdateUserFormDataSchema>;
    register: UseFormRegister<UpdateUserFormDataSchema>;
    watch: UseFormWatch<UpdateUserFormDataSchema>
    readonly?: boolean
}

export default function UpdateUserForm({ data, errors, register, watch, readonly = false }: UpdateUserFormPorps) {
    return (
        <>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 mx-5 items-start">
                <div className="mb-4.5 flex flex-col w-full md:flex-1">
                    <FormInput label="Nombre de usuario o código de militar" required
                        placeholder="Ingresa el nombre de usuario"
                        name="fullName"
                        readonly
                        defaultValue={data?.fullName}
                    />
                </div>
                <div className="mb-4.5 flex flex-col">
                    <FormInput label="Nombre de usuario o código de militar" required
                        placeholder="Ingresa el nombre de usuario"
                        name="userName"
                        readonly
                        defaultValue={data?.userName}
                    />
                </div>
                <div className="mb-4.5 flex flex-col">
                    <FormInput register={register} label="Correo electrónico institucional" required
                        placeholder="Ingresa el correo electrónico"
                        name="email"
                        defaultValue={watch('email')}
                        readonly={readonly}
                    />
                    {errors.email && (
                        <ErrorFormMessage>{errors.email.message}</ErrorFormMessage>
                    )}
                </div>
            </div>
        </>
    )
}