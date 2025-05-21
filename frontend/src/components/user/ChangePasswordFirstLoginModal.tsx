import { useMemo } from "react";
import Modal from "../common/Modal/Modal";
import ButtonGroup from "../common/ButtonGroup/ButtonGroup";
import { UpdateUserPasswordFormDataSchema } from "@/types/user.schema";
import { useChangePasswordFirstLoginForm } from "@/hooks/user/forms/useChangePasswordFirstLoginForm";
import { useChangePasswordFirstLogin } from "@/hooks/user/mutations/useChangePasswordFirstLogin";
import ChangePasswordFirstLoginForm from "./ChangePasswordFistLoginForm";

interface CreateUserModalProps {
    isOpen: boolean;
    userId: number;
}

export default function ChangePasswordFirstLoginModal({ isOpen, userId }: CreateUserModalProps) {
    const { mutate, isPending } = useChangePasswordFirstLogin();

    const { register, handleSubmit, formState: { errors }, } = useChangePasswordFirstLoginForm({
        userId: 0,
        password: '',
        confirmPassword: ''
    });

    const handleForm = async (formData: UpdateUserPasswordFormDataSchema) => {
        if (!userId) {
            return;
        }

        formData.userId = userId;

        mutate(formData);
    };

    const buttons = useMemo(
        () => [
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
        <Modal isOpen={isOpen} onClose={() => { }} title="Primer inicio de sesión">
            <h2 className="mb-2">Por seguridad debe cambiar su contraseña</h2>
            <form onSubmit={handleSubmit(handleForm)}>
                <fieldset disabled={isPending}>
                    <ChangePasswordFirstLoginForm
                        register={register}
                        errors={errors}
                    />
                </fieldset>
                <div className="mt-4">
                    <ButtonGroup buttons={buttons} />
                </div>
            </form>
        </Modal>
    );
}