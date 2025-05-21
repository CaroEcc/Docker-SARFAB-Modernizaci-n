import { z } from 'zod';
export const RequesterSchema = z.object({
  requesterId: z.number().int().positive(),
  name: z.string().min(1, 'El nombre es obligatorio'),
  phone: z.string().nullable().optional(),
  mobilePhone: z.string().nullable().optional()
});

export type RequesterType = z.infer<typeof RequesterSchema>;

export const ListRequesterSchema = z.object({
  data: z.array(RequesterSchema),
  totalPages: z.number()
});
export type ListRequesterResponse = z.infer<typeof ListRequesterSchema>;
