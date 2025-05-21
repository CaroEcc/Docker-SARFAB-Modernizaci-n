import { z } from 'zod';

const VoluntareeGuarShema = z.object({
    voluntareeId: z.number(),
    voluntareeFullname: z.string(),
    grade: z.string(),
    status: z.number().optional()
});

const volunteerAttendance = z.object({
    voluntareeId: z.number(),
    status: z.number(),
    observation: z.string()
})

export const baseGuardSchema = z.object({
    guardId: z.number(),
    guardDate: z.string().min(10, "La fecha del tratamiento es obligatoria"),
    shiftId: z.number().min(1, "El turno es obligatorio"),
    shiftName: z.string(),
    responsibleId: z.number().min(1, "El responsable es obligatorio"),
    responsibleFullname: z.string(),
    location: z.string().min(1, "La ubicación es obligatoria"),
    volunteerQuantity: z.number(),
    observation: z.string().nullable().optional(),
    status: z.number(),
    voluntareeGuards: z.array(VoluntareeGuarShema)
});

export const listGuardSchema = z.object({
    data: z.array(baseGuardSchema.omit({ voluntareeGuards: true })),
    totalPages: z.number().optional(),
    totalRecords: z.number()
});

export const guardCreateFormDataSchema = baseGuardSchema.pick({
    guardDate: true,
    location: true,
    responsibleId: true,
    shiftId: true
}).extend({
    voluntareeIds: z.array(z.number())
})

export const endGuardFormData = z.object({
    guardId: z.number(),
    observations: z.string(),
    volunteerAttendances: z.array(
        volunteerAttendance
    ),
})

const shiftSchema = z.object({
    shiftId: z.number(),
    name: z.string(),
});

export const listShiftSchema = z.array(shiftSchema);
export type ShiftList = z.infer<typeof listShiftSchema>;

export type Guard = z.infer<typeof baseGuardSchema>;
export type GuardFormData = z.infer<typeof guardCreateFormDataSchema>;
export type VoluntareeGuard = z.infer<typeof VoluntareeGuarShema>;
export type VolunteerAttendance = z.infer<(typeof volunteerAttendance)>;
export type EndGuardFormData = z.infer<(typeof endGuardFormData)>