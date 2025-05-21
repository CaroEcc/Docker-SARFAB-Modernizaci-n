
import { passwordRecoveryFormDataSchema, PasswordRecoveryFormDataSchema } from "@/types/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function usePasswordRecoveryByUserForm(defaultValues: Partial<PasswordRecoveryFormDataSchema>) {
    const form = useForm<PasswordRecoveryFormDataSchema>({
        resolver: zodResolver(passwordRecoveryFormDataSchema),
        defaultValues: defaultValues || {
            userName: '',
            email: ''
        },
    });

    return { ...form, setValue: form.setValue };
}