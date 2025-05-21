import { useMemo } from "react";
import Modal from "../common/Modal/Modal";
import ButtonGroup from "../common/ButtonGroup/ButtonGroup";
import { PasswordRecoveryFormDataSchema } from "@/types/user.schema";
import FormInput from "../common/FormInput/FormInput";
import { usePasswordRecoveryByUserForm } from "@/hooks/user/forms/usePasswordRecoveryByUserForm";
import { usePasswordRecoveryByUser } from "@/hooks/user/mutations/usePasswordRecoveryByUser";
import ErrorFormMessage from "../common/ErrorFormMessage/ErrorFormMessage";

interface PasswordRecoveryByUserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PasswordRecoveryByUserModal({ isOpen, onClose }: PasswordRecoveryByUserModalProps) {
    const { mutate, isPending } = usePasswordRecoveryByUser();

    const { register, handleSubmit, formState: { errors } } = usePasswordRecoveryByUserForm({
        userName: "",
        email: ''
    });

    const handleForm = async (formData: PasswordRecoveryFormDataSchema) => {
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
                label: "Recuperar contraseña",
                onClick: handleSubmit(handleForm),
                variant: "primary" as const,
                isLoading: isPending,
                disabled: isPending,
            },
        ],
        [isPending, onClose]
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Recuperar contraseña">
            <form onSubmit={handleSubmit(handleForm)}>
                <fieldset disabled={isPending}>
                    <div className="mb-4.5 flex flex-col w-full md:flex-1">
                        <FormInput register={register} label="Correo electrónico asociado al usuario" required
                            placeholder="Ingresa el correo electrónico"
                            name="email"
                        />
                        {errors.email && (
                            <ErrorFormMessage>{errors.email.message}</ErrorFormMessage>
                        )}
                    </div>
                    <div className="mb-4.5 flex flex-col">
                        <FormInput register={register} label="Nombre de usuario" required
                            placeholder="Ingresa el nombre de usuario"
                            name="userName"
                        />
                        {errors.userName && (
                            <ErrorFormMessage>{errors.userName.message}</ErrorFormMessage>
                        )}
                    </div>
                </fieldset>
                <div className="mt-4">
                    <ButtonGroup buttons={buttons} />
                </div>
            </form>
        </Modal>
    );
}
