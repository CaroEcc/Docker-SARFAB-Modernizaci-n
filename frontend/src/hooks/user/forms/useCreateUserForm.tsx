import { getMilitaryWithRank } from "@/api/OperationContextAPI";
import { MilitaryWithRankList } from "@/types/operationContext.schema";
import { createUserFormDataSchema, CreateUserFormDataSchema } from "@/types/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function useCreateUserForm(defaultValues: Partial<CreateUserFormDataSchema>) {
    const form = useForm<CreateUserFormDataSchema>({
        resolver: zodResolver(createUserFormDataSchema),
        defaultValues: defaultValues || {
            personId: 0,
            userName: '',
            email: '',
            role: 0
        },
    });

    const [militaries, setMilitaries] = useState<MilitaryWithRankList>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const [militaryData] = await Promise.all([
                    getMilitaryWithRank(),
                ]);
                setMilitaries(militaryData);
            } catch (error) {
                console.error("Error loading form data:", error);
            }
        }

        fetchData();
    }, []);

    return { ...form, setValue: form.setValue, militaries };
}