import { z } from 'zod';

export enum StatusEnum {
  Disabled = 0,
  Enabled = 1,
}

// Base Operation
const BaseOperationSchema = z.object({
  address: z.string().min(1, 'Debe ingresar una dirección').max(50, 'El nombre no puede tener más de 50 caracteres'),
  departureDate: z.string().min(1, "Debe ingresar una fecha de salida"),
  arrivalDate: z.string().min(1, "Debe ingresar una fecha de llegada"),
});

export const OperationPersonSchema = z.object({
  personId: z.number(),
  role: z.string(),
})

export const OperationPersonnelSchema = z.object({
  personId: z.number(),
  fullName: z.string(),
  rankOrGrade: z.string(),
  status: z.number(),
})

export const RequesterSchema = z.object({
  requesterName: z.string().min(1, 'Debe ingresar el nombre del solicitante').max(50, 'El nombre no puede tener más de 50 caracteres'),
  requesterPhone: z.string(),
  requesterMobilePhone: z.string().min(1, 'Debe ingresar el celular del solicitante').max(15, 'El teléfono debe tener entre 8 y 15 dígitos')
    .regex(/^[0-9]*$/, 'El teléfono debe contener solo números'),
})

// Active Operation
export const ActiveOperationSchema = BaseOperationSchema.extend({
  operationId: z.number(),
  municipalityName: z.string(),
  requesterName: z.string(),
  categoryAndOperationType: z.string(),
  responsible: z.string(),
  status: z.nativeEnum(StatusEnum),
});

export type ActiveOperation = z.infer<typeof ActiveOperationSchema>;

export const ListOperationSchema = z.object({
  data: z.array(ActiveOperationSchema),
  totalPages: z.number(),
  totalRecords: z.number()
});

export type ListOperationResponse = z.infer<typeof ListOperationSchema>;

export const CreateOperationSchema = BaseOperationSchema.extend({
  operationTypeId: z.coerce.number().min(1, 'Debe seleccionar un tipo de operación'),
  municipalityId: z.coerce.number().min(1, 'Debe seleccionar un municipio válido'),
  requester: RequesterSchema,
  responsible: OperationPersonSchema,
  personnel: z.array(OperationPersonSchema),
});

export type CreateOperationForm = z.infer<typeof CreateOperationSchema>;

export const CreateOperationSchemaWithValidation = CreateOperationSchema.refine(
  (data) => {
    const departureDate = new Date(data.departureDate.replace(/-/g, "/"));
    const arrivalDate = new Date(data.arrivalDate.replace(/-/g, "/"));
    return departureDate <= arrivalDate;
  },
  {
    message: "Debe seleccionar una fecha de llegada mayor o igual a la fecha de salida.",
    path: ["arrivalDate"],
  }
);

export type FormattedOperationData = Omit<CreateOperationForm, 'departureDate' | 'arrivalDate'> & {
  departureDate: string;
  arrivalDate: string;
};

// Update Operation
export const UpdateOperationSchema = CreateOperationSchema.extend({
  observations: z.string().optional(),
})

export type UpdateOperationForm = z.infer<typeof UpdateOperationSchema>;

// Update Operation Status
export const UpdateOperationStatusSchema = z.object({
  status: z.nativeEnum(StatusEnum),
  observations: z.string().optional(),
})

export type UpdateOperationStatusForm = z.infer<typeof UpdateOperationStatusSchema>;

// Operation Detail 
export const OperationDetailSchema = ActiveOperationSchema.omit({
  categoryAndOperationType: true, responsible: true, status: true
}).extend({
  operationTypeName: z.string(),
  categoryName: z.string(),
  departmentName: z.string(),
  provinceName: z.string(),
  observations: z.string().optional(),
  operationStatus: z.string(),
  requesterPhone: z.string(),
  requesterMobile: z.string(),
  responsible: OperationPersonnelSchema,
  personnel: z.array(OperationPersonnelSchema),
  requesterId: z.number(),
  municipalityId: z.number(),
  operationTypeId: z.number(),
})

export type OperationDetailResponse = z.infer<typeof OperationDetailSchema>;

// Absence mark
export const AbsenceMarkSchema = BaseOperationSchema.omit({ address: true }).extend({
  activity: z.string(),
  departmentName: z.string(),
  municipalityName: z.string(),
  provinceName: z.string(),
  volunteers: z.array(OperationPersonnelSchema),
})

export type AbsenceMarkResponse = z.infer<typeof AbsenceMarkSchema>;

// Update status person operation
export const UpdatePersonStatusSchema = z.object({
  operationId: z.number(),
  personId: z.number(),
  status: z.number(),
})

export type UpdatePersonStatusForm = z.infer<typeof UpdatePersonStatusSchema>;