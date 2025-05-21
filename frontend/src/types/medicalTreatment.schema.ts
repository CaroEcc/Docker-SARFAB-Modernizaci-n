import { convertToLocalDate } from '@/utils/common/formatDate';
import { z } from 'zod';

const baseMedicalTreatmentSchema = z.object({
    medicalTreatmentId: z.number(),
    treatmentDate: z.preprocess(convertToLocalDate, z.string().min(10, "La fecha del tratamiento es obligatoria")),
    diagnosis: z.string().trim().min(1, "El diagnóstico es obligatorio"),
    description: z.string().trim().min(1, "La descripción es obligatoria"),
    attendingPersonId: z.number().min(1, "Es obligatorio seleccionar la persona que atendió"),
    attendingPersonFullname: z.string(),
    patientPersonId: z.number().min(1, "Es obligatorio seleccionar la persona atendida"),
    patientPersonFullname: z.string(),
});

export const listMedicalTreatmentSchema = z.object({
    data: z.array(baseMedicalTreatmentSchema),
    totalPages: z.number().optional(),
    totalRecords: z.number()
});

export const medicalTreatmentFormSchema = baseMedicalTreatmentSchema.omit({
    medicalTreatmentId: true,
    attendingPersonFullname: true,
    patientPersonFullname: true,
}).refine(
    (obj) => obj.attendingPersonId !== obj.patientPersonId,
    {
        message: "El paciente y la persona que atiende no pueden ser la misma persona",
        path: ["attendingPersonId"]
    }
);;

export type MedicalTreatment = z.infer<typeof baseMedicalTreatmentSchema>;
export type MedicalTreatmentFormData = Pick<MedicalTreatment, 'treatmentDate' | 'diagnosis' | 'description' | 'attendingPersonId' | 'patientPersonId'>
