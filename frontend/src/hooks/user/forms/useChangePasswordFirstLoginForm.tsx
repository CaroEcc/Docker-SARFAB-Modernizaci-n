
import { updateUserPasswordFormDataSchema, UpdateUserPasswordFormDataSchema } from "@/types/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useChangePasswordFirstLoginForm(defaultValues: Partial<UpdateUserPasswordFormDataSchema>) {
    const form = useForm<UpdateUserPasswordFormDataSchema>({
        resolver: zodResolver(updateUserPasswordFormDataSchema),
        defaultValues: defaultValues || {
            userId: 0,
            confirmPassword: '',
            password: ''
        },
    });

    return { ...form, setValue: form.setValue, };
}