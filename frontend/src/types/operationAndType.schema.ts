import { z } from 'zod';

// **Base**
const BaseOperationSchema = z.object({
  name: z
    .string()
    .max(100, 'El nombre no puede tener más de 100 caracteres.')
    .regex(/\S.*/, 'El nombre no puede estar vacío o contener solo espacios.'),
});

// **Create / Update Category**
export const CreateOperationCategorySchema = BaseOperationSchema;
export type CreateOperationCategoryForm = z.infer<typeof CreateOperationCategorySchema>;

export const UpdateOperationCategorySchema = BaseOperationSchema.partial();
export type UpdateOperationCategoryForm = z.infer<typeof UpdateOperationCategorySchema>;

// **Create / Update Type**
export const CreateOperationTypeSchema = BaseOperationSchema.extend({
  operationCategoryId: z.number({ required_error: 'Debe seleccionar una categoría de operación.' }),
});
export type CreateOperationTypeForm = z.infer<typeof CreateOperationTypeSchema>;

export const UpdateOperationTypeSchema = BaseOperationSchema.partial();
export type UpdateOperationTypeForm = z.infer<typeof UpdateOperationTypeSchema>;

// **DTOs para lectura**
export const OperationTypeSchema = z.object({
  operationTypeId: z.number(),
  name: z.string(),
  operationCategoryId: z.number(),
});
export type OperationType = z.infer<typeof OperationTypeSchema>;

export const OperationCategoryWithTypesSchema = z.object({
  categoryId: z.number(),
  categoryName: z.string(),
  operations: z.array(OperationTypeSchema),
});
export type OperationCategoryWithTypes = z.infer<typeof OperationCategoryWithTypesSchema>;
