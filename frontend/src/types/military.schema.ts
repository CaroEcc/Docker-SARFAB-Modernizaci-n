import { z } from 'zod';

export enum StatusEnum {
  Disabled = 0,
  Enabled = 1,
}

const BaseMilitarySchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  mobilePhone: z.string().nullable(),
  militaryRankId: z.number().optional(),
  rankName: z.string().optional(),
  status: z.nativeEnum(StatusEnum),
  canPromote: z.boolean(),
});

export const MilitarySchema = BaseMilitarySchema;

const formValidations = {
  firstName: z
    .string()
    .min(1, 'Debe ingresar los nombres')
    .regex(/^[a-zA-Z\s]*$/, 'Este campo no puede contener números')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
  lastName: z
    .string()
    .min(1, 'Debe ingresar los apellidos')
    .max(50, 'El apellido no puede tener más de 50 caracteres')
    .regex(/^[a-zA-Z\s]*$/, 'Este campo no puede contener números'),
  mobilePhone: z
    .string()
    .min(8, 'El teléfono debe tener entre 8 y 15 dígitos')
    .max(15, 'El teléfono debe tener entre 8 y 15 dígitos')
    .regex(/^[0-9]*$/, 'El teléfono debe contener solo números'),
  militaryRankId: z.number({
    required_error: 'Debe seleccionar un grado militar',
    invalid_type_error: 'No selecciono un grado'
  }).refine(val => val !== null && val !== 0 && val !== undefined, {
    message: 'Debe seleccionar un grado militar'
  }),
};

export const CreateMilitarySchema = BaseMilitarySchema
  .omit({
    id: true,
    status: true,
    canPromote: true,
  })
  .extend({
    firstName: formValidations.firstName,
    lastName: formValidations.lastName,
    mobilePhone: formValidations.mobilePhone,
    militaryRankId: formValidations.militaryRankId,
  });

export const UpdateMilitarySchema = BaseMilitarySchema
  .partial()
  .omit({
    id: true,
    status: true,
    canPromote: true,
  })
  .extend({
    firstName: formValidations.firstName.optional(),
    lastName: formValidations.lastName.optional(),
    mobilePhone: formValidations.mobilePhone.optional(),
    militaryRankId: formValidations.militaryRankId.optional(),
  });

export const ListMilitarySchema = z.object({
  data: z.array(MilitarySchema),
  totalPages: z.number(),
  totalRecords: z.number()
});

export type Military = z.infer<typeof MilitarySchema>;
export type CreateMilitaryForm = z.infer<typeof CreateMilitarySchema>;
export type UpdateMilitaryForm = z.infer<typeof UpdateMilitarySchema>;
export type ListMilitaryResponse = z.infer<typeof ListMilitarySchema>;
