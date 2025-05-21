import { z } from "zod";

export const courseSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    description: z.string()
});

export const coursesSelect =  z.array(
  courseSchema.pick({
    id: true,
    name: true,
  })
);

export type Course = z.infer<typeof courseSchema>;


// CourseParticipantDTO
export const courseParticipantSchema = z.object({
  fullName: z.string().default(""),
  rank: z.string().default(""),
  completionDate: z.string(),
});
export type CourseParticipant = z.infer<typeof courseParticipantSchema>;

// CourseDetailDTO
export const courseDetailSchema = courseSchema.extend({
  participants: z.array(courseParticipantSchema),
});
export type CourseDetail = z.infer<typeof courseDetailSchema>;

// CreateCourseDTO
export const createCourseSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Debe ingresar un nombre para el curso." })
    .max(100, { message: "El nombre no puede tener más de 100 caracteres." })
    .regex(/^\S.*$/, { message: "El nombre no puede estar vacío o contener solo espacios." }),
  description: z
    .string()
    .max(500, { message: "La descripción no puede tener más de 500 caracteres." })
    .regex(/^\S.*$/, { message: "La descripción no puede estar vacía o contener solo espacios." }),
});
export type CreateCourseForm = z.infer<typeof createCourseSchema>;

// UpdateCourseDTO
export const updateCourseSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener entre 2 y 100 caracteres." })
    .max(100, { message: "El nombre debe tener entre 2 y 100 caracteres." })
    .regex(/^\S.*$/, { message: "El nombre no puede estar vacío o contener solo espacios." })
    .optional(),
  description: z
    .string()
    .max(500, { message: "La descripción no puede tener más de 500 caracteres." })
    .regex(/^\S.*$/, { message: "La descripción no puede estar vacía o contener solo espacios." })
    .optional(),
});
export type UpdateCourseForm = z.infer<typeof updateCourseSchema>;

// VolunteerAssignmentDTO
export const volunteerAssignmentSchema = z.object({
  volunteerId: z.number(),
  completionDate: z.string(),
});
export type VolunteerAssignment = z.infer<typeof volunteerAssignmentSchema>;

// AssignMultipleVolunteersToCourseDTO
export const assignMultipleVolunteersToCourseSchema = z.object({
  courseId: z.number({
    required_error: "Debe seleccionar un curso.",
  }),
  volunteers: z
    .array(volunteerAssignmentSchema)
    .min(1, { message: "Debe haber al menos un voluntario en la lista." }),
});
export type AssignMultipleVolunteersToCourseForm = z.infer<typeof assignMultipleVolunteersToCourseSchema>;

export const assignCourseVolunteersSchema = z.object({
  courseId: z.number(),
  volunteers: z
    .array(
      z.object({
        volunteerId: z.number(),
        completionDate: z.string(),
      })
    )
    .min(1, { message: "Debe agregar al menos un voluntario." }),
});

export type AssignCourseVolunteersForm = z.infer<typeof assignCourseVolunteersSchema>;