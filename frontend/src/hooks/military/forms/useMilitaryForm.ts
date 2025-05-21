import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateMilitarySchema, CreateMilitaryForm } from '@/types/index';

export function useMilitaryForm(defaultValues?: Partial<CreateMilitaryForm>) {
    return useForm<CreateMilitaryForm>({
        resolver: zodResolver(CreateMilitarySchema),
        defaultValues: defaultValues || {
            firstName: '',
            lastName: '',
            mobilePhone: '',
            militaryRankId: 0,
        },
        mode: 'onChange',
    });
}
