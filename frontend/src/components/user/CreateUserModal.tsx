import { useMemo } from "react";
import Modal from "../common/Modal/Modal";
import ButtonGroup from "../common/ButtonGroup/ButtonGroup";
import CreateUserForm from "./CreateUserForm";
import { useCreateUserForm } from "@/hooks/user/forms/useCreateUserForm";
import { CreateUserFormDataSchema } from "@/types/user.schema";
import { useCreateUser } from "@/hooks/user/mutations/useCreateUser";

interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateUserModal({ isOpen, onClose }: CreateUserModalProps) {
    const { mutate, isPending } = useCreateUser();

    const { register, handleSubmit, formState: { errors }, control, militaries } = useCreateUserForm({
        personId: 0,
        userName: '',
        email: '',
        role: 1
    });

    const handleForm = async (formData: CreateUserFormDataSchema) => {
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
                label: "Crear usuario",
                onClick: handleSubmit(handleForm),
                variant: "primary" as const,
                isLoading: isPending,
                disabled: isPending,
            },
        ],
        [isPending, onClose]
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Crear nuevo usuario">
            <form onSubmit={handleSubmit(handleForm)}>
                <fieldset disabled={isPending}>
                    <CreateUserForm
                        militarsData={militaries}
                        register={register}
                        errors={errors}
                        control={control}
                    />
                </fieldset>
                <div className="mt-4">
                    <ButtonGroup buttons={buttons} />
                </div>
            </form>
        </Modal>
    );
}