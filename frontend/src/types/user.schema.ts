import { z } from 'zod';
import { authSchema } from '@/types/auth.schema';

export const userSchema = authSchema.pick({
  username: true
}).extend({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  lastName: z.string(),
  role: z.number(),
  firstLogin: z.number()
})
export type User = z.infer<typeof userSchema>;

//User Management
export const userBaseSchema = z.object({
  userId: z.number(),
  personId: z.number().min(1, "La persona obligatorio"),
  fullName: z.string(),
  userName: z.string().trim().min(1, "El nombre de usuario es obligatorio"),
  email: z.string().trim().min(1, "El correo electrónico es obligatorio").email({ message: "El correo electrónico no es válido. Ej: usuario@dominio.com" }),
  status: z.number()
})

export const listUsersSchema = z.object({
  data: z.array(userBaseSchema),
  totalPages: z.number(),
  totalRecords: z.number()
})

export const createUserFormDataSchema = userBaseSchema.pick({
  personId: true,
  userName: true,
  email: true
}).extend({
  role: z.number()
})

export const updateUserFormDataSchema = userBaseSchema.pick({
  userId: true,
  email: true
})

export const updateUserPasswordFormDataSchema = userBaseSchema.pick({
  userId: true
}).extend({
  password: z.string()
    .nonempty({ message: 'La contraseña es requerida' })
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
  confirmPassword: z.string()
    .nonempty({ message: 'La confirmación de contraseña es requerida' })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'], // el error aparecerá en el campo confirmPassword
});


export const userChangePasswordFormDataSchema = userBaseSchema.pick({
  userName: true
}).extend({
  lastPassword: z.string().nonempty({ message: 'La contraseña actual es requerida' }),
  newPassword: z.string()
    .nonempty({ message: 'La contraseña nueva es requerida' })
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),

  confirmPassword: z.string()
    .nonempty({ message: 'La confirmación de contraseña es requerida' })
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'], // el error aparecerá en el campo confirmPassword
});

export const passwordRecoveryFormDataSchema = userBaseSchema.pick({
  userName: true,
  email: true
})

export type UserSchema = z.infer<typeof userBaseSchema>;
export type CreateUserFormDataSchema = z.infer<typeof createUserFormDataSchema>;
export type UpdateUserFormDataSchema = z.infer<typeof updateUserFormDataSchema>;
export type UserChangePasswordFormDataSchema = z.infer<typeof userChangePasswordFormDataSchema>;
export type UpdateUserPasswordFormDataSchema = z.infer<typeof updateUserPasswordFormDataSchema>;
export type PasswordRecoveryFormDataSchema = z.infer<typeof passwordRecoveryFormDataSchema>
