
import { updateUserFormDataSchema, UpdateUserFormDataSchema } from "@/types/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useUpdateUserForm(defaultValues: Partial<UpdateUserFormDataSchema>) {
    const form = useForm<UpdateUserFormDataSchema>({
        resolver: zodResolver(updateUserFormDataSchema),
        defaultValues: defaultValues || {
            userId: 0,
            email: ''
        },
    });

    return { ...form, setValue: form.setValue };
}