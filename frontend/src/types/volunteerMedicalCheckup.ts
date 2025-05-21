import { z } from "zod";

const withDateValidation = <T extends z.ZodTypeAny>(schema: T) =>
  schema.refine(
    (data: any) => new Date(data.checkupDate) <= new Date(data.expirationDate),
    {
      message: "La fecha de chequeo no puede ser mayor que la fecha de expiración",
      path: ["checkupDate"],
    }
  )

const checkupSchema = z.object({
  checkupId: z.number(),
  checkupDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida (Formato YYYY-MM-DD)"),
  expirationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida (Formato YYYY-MM-DD)"),
  observations: z.string(),
});

export const medicalCheckupVounteerSchema = z.object({
  checkupId: z.number().int().min(0, "El ID del chequeo médico debe ser un número positivo"),
  volunteerId: z.number().int().min(0, "El ID del voluntario debe ser un número positivo"), 
  checkupDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Fecha de chequeo inválida" }), 
  expirationDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Fecha de expiración inválida" }),
  observations: z.string(),
});

export const medicalCheckupVounteerSchemaWithValidation = withDateValidation(
  medicalCheckupVounteerSchema.omit({ checkupId: true })
);

export const medicalCheckupWithoutIdSchema = medicalCheckupVounteerSchema.omit({
  checkupId: true,
});

export const medicalCheckupUpdateSchema = medicalCheckupVounteerSchema.omit({
  checkupId: true,
  volunteerId: true
});

export type MedicalCheckup = z.infer<typeof checkupSchema>;
export type MedicalCheckupVolunteerFormData = Omit<z.infer<typeof medicalCheckupVounteerSchema>, "checkupId">;
export type MedicalCheckupVolunteerUpdateFormData = Omit<z.infer<typeof medicalCheckupVounteerSchema>, "checkupId" | "volunteerId">;
export type MedicalCheckupVolunteerEditFormData = Omit<MedicalCheckupVolunteerFormData, "volunteerId">;

export const checkupListSchema = z.array(checkupSchema);
