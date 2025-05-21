import { UpdateUserPasswordFormDataSchema } from "@/types/user.schema";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorFormMessage from "../common/ErrorFormMessage/ErrorFormMessage";
import FormInput from "../common/FormInput/FormInput";

interface CreateUserFormPorps {
    errors: FieldErrors<UpdateUserPasswordFormDataSchema>;
    register: UseFormRegister<UpdateUserPasswordFormDataSchema>;
}

export default function ChangePasswordFirstLoginForm({ errors, register }: CreateUserFormPorps) {
    return (
        <>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 mx-5 items-start">
                <div className="mb-4.5 flex flex-col">
                    <FormInput register={register} label="Contraseña" required
                        placeholder="Ingrese la contraseña"
                        type='password'
                        name="password" />
                    {errors.password && (
                        <ErrorFormMessage>{errors.password.message}</ErrorFormMessage>
                    )}
                </div>
                <div className="mb-4.5 flex flex-col">
                    <FormInput register={register} label="Confirmar contaseña" required
                        placeholder="Vuelva a introducir la contraseña"
                        type='password'
                        name="confirmPassword" />
                    {errors.confirmPassword && (
                        <ErrorFormMessage>{errors.confirmPassword.message}</ErrorFormMessage>
                    )}
                </div>
            </div>
        </>
    )
}