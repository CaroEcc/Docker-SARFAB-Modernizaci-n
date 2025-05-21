import { useMemo } from "react";
import Modal from "../common/Modal/Modal";
import ButtonGroup from "../common/ButtonGroup/ButtonGroup";
import { UserChangePasswordFormDataSchema } from "@/types/user.schema";
import FormInput from "../common/FormInput/FormInput";
import ErrorFormMessage from "../common/ErrorFormMessage/ErrorFormMessage";
import { useUserChangePassword } from "@/hooks/user/mutations/useUserChangePassword";
import { useUserChangePasswordForm } from "@/hooks/user/forms/useUserChangePasswordForm";

interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    userName: string;
}

export default function UserChangePasswordModal({ isOpen, onClose, userName }: CreateUserModalProps) {
    const { mutate, isPending } = useUserChangePassword();

    const { register, handleSubmit, formState: { errors }, } = useUserChangePasswordForm({
        userName: userName,
        lastPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleForm = async (formData: UserChangePasswordFormDataSchema) => {
        if (!userName) {
            return;
        }

        formData.userName = userName;

        mutate(formData, {
            onSuccess: onClose
        });
    };

    const buttons = useMemo(
        () => [
            {
                type: "button" as const,
                label: "Cancelar",
                onClick: onClose,
                variant: "secondary" as const,
                disabled: isPending,
            },
            {
                type: "button" as const,
                label: "Cambiar contraseña",
                onClick: handleSubmit(handleForm),
                variant: "primary" as const,
                isLoading: isPending,
                disabled: isPending,
            },
        ],
        [isPending]
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Cambiar mi contraseña">
            <h2 className="mb-2">¿Deseas cambiar tu contraseña?</h2>
            <form onSubmit={handleSubmit(handleForm)}>
                <fieldset disabled={isPending}>
                    <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 mx-5 items-start">
                        <div className="mb-6 flex flex-col">
                            <FormInput register={register} label="Contraseña" required
                                placeholder="Ingrese su contraseña actual"
                                type='password'
                                name="lastPassword" />
                            {errors.lastPassword && (
                                <ErrorFormMessage>{errors.lastPassword.message}</ErrorFormMessage>
                            )}
                        </div>
                        <div className="mb-4.5 flex flex-col">
                            <FormInput register={register} label="Nueva contraseña" required
                                placeholder="Ingrese la contraseña nueva"
                                type='password'
                                name="newPassword" />
                            {errors.newPassword && (
                                <ErrorFormMessage>{errors.newPassword.message}</ErrorFormMessage>
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
                </fieldset>
                <div className="mt-4">
                    <ButtonGroup buttons={buttons} />
                </div>
            </form>
        </Modal>
    );
}