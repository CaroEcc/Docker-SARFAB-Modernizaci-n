import { z } from "zod";

export const GradeSchema = z.object({
  id: z.number().int(), 
  name: z.string().min(1, "El nombre es obligatorio"),
});

export type Grades = z.infer<typeof GradeSchema>;

export const listGrades = z.array(GradeSchema);
