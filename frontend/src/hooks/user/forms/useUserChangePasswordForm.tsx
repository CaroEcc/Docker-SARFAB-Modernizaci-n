import { userChangePasswordFormDataSchema, UserChangePasswordFormDataSchema } from "@/types/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useUserChangePasswordForm(defaultValues: Partial<UserChangePasswordFormDataSchema>) {
    const form = useForm<UserChangePasswordFormDataSchema>({
        resolver: zodResolver(userChangePasswordFormDataSchema),
        defaultValues: defaultValues || {
            userName: 0,
            lastPassword: '',
            confirmPassword: '',
            newPasswordpassword: ''
        },
    });

    return { ...form, setValue: form.setValue, };
}