import { useForm } from "react-hook-form";
import Button from "@/components/common/Button/Button";
import { AuthFormProps } from "./types/AuthFormProps.types";
import { UserLoginForm } from "@/types/index";
import AuthHeader from "./AuthHeader";
import ErrorFormMessage from "../common/ErrorFormMessage/ErrorFormMessage";
import { useState } from "react";
import PasswordRecoveryByUserModal from "../user/PasswordRecoveryByUserModal";

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isLoading }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserLoginForm>({
        defaultValues: { username: "", password: "" },
    });

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    return (
        <>
            <div className='justify-center items-center flex flex-col'>
                <div className='w-full flex flex-col max-w-[550px] '>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className='my-10'>
                            <AuthHeader />

                            <div className='w-full flex flex-col mb-5.5'>
                                <div className='flex flex-col'>
                                    <input
                                        id="username"
                                        type="username"
                                        placeholder='Nombre de usuario'
                                        className='w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                                        {...register("username", {
                                            required: "El nombre de usuario es obligatorio",
                                        })} />
                                    {errors.username && (
                                        <ErrorFormMessage>{errors.username.message}</ErrorFormMessage>
                                    )}
                                </div>
                                <div className='flex flex-col mb-5.5'>
                                    <input
                                        id="password"
                                        type='password'
                                        placeholder='Contraseña'
                                        className='w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                                        {...register("password", {
                                            required: "La contraseña es obligatorio",
                                        })} />
                                    {errors.password && (
                                        <ErrorFormMessage>{errors.password.message}</ErrorFormMessage>
                                    )}
                                </div>
                            </div>

                            <div className='w-full flex items-conter justify-between'>
                                <p onClick={() => setIsModalOpen(true)} className='text-pm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2'>¿Olvidaste tu contraseña?</p>
                            </div>
                        </div>

                        <div className='w-full flex flex-col'>
                            <Button type='submit' label='Iniciar sesión' variant='dark' isLoading={isLoading} loadingLabel="Iniciando sesión..." classname="btn-lg" />
                        </div>
                    </form>
                </div>
            </div>
            {
                isModalOpen &&
                <PasswordRecoveryByUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            }

        </>
    );
};

export default AuthForm;
