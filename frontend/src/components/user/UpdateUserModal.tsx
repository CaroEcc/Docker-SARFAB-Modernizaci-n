import { useEffect, useMemo } from "react";
import Modal from "../common/Modal/Modal";
import ButtonGroup from "../common/ButtonGroup/ButtonGroup";
import { UpdateUserFormDataSchema } from "@/types/user.schema";
import { useUpdateUser } from "@/hooks/user/mutations/useUpdateUser";
import { useUpdateUserForm } from "@/hooks/user/forms/useUpdateUserForm";
import { useGetUserById } from "@/hooks/user/querys/useGetUserById";
import UpdateUserForm from "./UpdateUserForm";
import Loader from "../common/Loader";

interface UpdateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number;
    readonly: boolean;
}

export default function UpdateUserModal({ isOpen, onClose, userId, readonly }: UpdateUserModalProps) {
    const { data, isLoading } = useGetUserById(userId);
    const { mutate, isPending } = useUpdateUser();

    const { register, handleSubmit, formState: { errors }, reset, watch } = useUpdateUserForm({
        userId: 0,
        email: ''
    });

    useEffect(() => {
        if (data) {
            reset({
                userId: data?.userId,
                email: data?.email,
            });
        }
    }, [data, reset]);

    const handleForm = async (formData: UpdateUserFormDataSchema) => {
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
                label: "Actualizar usuario",
                onClick: handleSubmit(handleForm),
                variant: "primary" as const,
                isLoading: isPending,
                disabled: isPending,
            },
        ],
        [isPending, onClose]
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={readonly ? 'Detalles del usuario' : "Actualizar usuario"}>
            {!isLoading ?
                <form onSubmit={handleSubmit(handleForm)}>
                    <fieldset disabled={isPending}>
                        <UpdateUserForm
                            data={data}
                            register={register}
                            errors={errors}
                            readonly={readonly}
                            watch={watch}
                        />
                    </fieldset>
                    {
                        !readonly &&
                        <div className="mt-4">
                            <ButtonGroup buttons={buttons} />
                        </div>
                    }
                </form>
                :
                <Loader message="Cargando datos previos" />
            }
        </Modal>
    );
}
