import { z } from 'zod';

/** Auth */
export const authSchema = z.object({
    username: z.string(),
    password: z.string()
})

type AuthForm = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<AuthForm, 'username' | 'password'>;
