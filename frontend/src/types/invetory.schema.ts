import { z } from 'zod';

const BaseItemSchema = z.object({
  name: z.string().min(1, "Debe ingresar el nombre del elemento").max(100, "El nombre debe tener un máximo de 100 caracteres"),
  quantity: z.number().min(1, "Debe ingresar la cantidad").max(1000, "La cantidad debe ser menor o igual a 1000"),
});

const BaseInventoryItemSchema = z.object({
  itemId: z.number(),
  name: z.string(),
});

const BaseMovementSchema = z.object({
  itemId: z.number(),
  quantity: z.coerce.number(),
});

export const CreateItemSchema = BaseItemSchema;
export type CreateItemForm = z.infer<typeof CreateItemSchema>;

export const UpdateItemSchema = BaseItemSchema.partial();
export type UpdateItemForm = z.infer<typeof UpdateItemSchema>;

export const MovementDetailSchema = BaseMovementSchema;
export type MovementDetail = z.infer<typeof MovementDetailSchema>;

export const InventoryBatchMovementSchema = z.object({
  volunteerId: z.number(),
  items: z.array(MovementDetailSchema),
});
export type InventoryBatchMovementForm = z.infer<typeof InventoryBatchMovementSchema>;

// Esquema de validación simplificado
export const InventoryMovementSchema = z.object({
  volunteerId: z.number()
    .min(1, "Debe seleccionar un voluntario válido"),
  itemId: z.number(),
  quantity: z.coerce.number()
    .min(1, "La cantidad debe ser un número mayor a 0")
    .int("La cantidad debe ser un número entero")
});

// Tipo para el formulario compatible con el esquema
export type InventoryMovementForm = z.input<typeof InventoryMovementSchema>;

export const InventoryItemSchema = BaseInventoryItemSchema.extend({
  totalStock: z.number(),
  assignedQuantity: z.number(),
  availableQuantity: z.number(),
});
export type InventoryItem = z.infer<typeof InventoryItemSchema>;

export const ListInventorySchema = z.object({
  data: z.array(InventoryItemSchema), 
  totalPages: z.number(),
  totalRecords: z.number()
});
export type ListInventoryResponse = z.infer<typeof ListInventorySchema>;

export const ItemSchema = BaseInventoryItemSchema.extend({
  quantity: z.number(),
  assignedQuantity: z.number(),
  availableQuantity: z.number(),
});
export type Item = z.infer<typeof ItemSchema>;

export const VolunteerPendingReturnSchema = z.object({
  volunteerId: z.number(),
  volunteerWithGrade: z.string(),
  quantity: z.number(),
});
export type VolunteerPendingReturn = z.infer<typeof VolunteerPendingReturnSchema>;

export const VolunteerWithPendingSchema = VolunteerPendingReturnSchema.omit({
  quantity: true,
});
export type VolunteerWithPending = z.infer<typeof VolunteerWithPendingSchema>;
  

export const ItemWithPendingTableSchema = BaseInventoryItemSchema.extend({
  totalQuantity: z.number(),
  pendingReturns: z.array(VolunteerPendingReturnSchema),
});
export type ItemWithPendingTable = z.infer<typeof ItemWithPendingTableSchema>;

export const MovementHistorySchema = z.object({
  volunteerName: z.string(),
  itemName: z.string(),
  movementDate: z.string(),
  action: z.string(),
  quantity: z.number(),
});
export type MovementHistory = z.infer<typeof MovementHistorySchema>;

export const ListMovementHistorySchema = z.object({
  data: z.array(MovementHistorySchema),
  totalPages: z.number(),
});
export type ListMovementHistoryResponse = z.infer<typeof ListMovementHistorySchema>;

export const BatchItemReturnSchema = z.object({
  volunteerId: z
    .preprocess(
      (val) => (val === undefined ? "" : val),
      z.string().min(1, "Debe seleccionar un voluntario válido").transform((val) => parseInt(val, 10))
    ),
});

export type BatchItemReturnForm = z.infer<typeof BatchItemReturnSchema>;

export const BatchItemWithdrawalSchema = z.object({
  volunteerId: z
    .preprocess(
      (val) => (val === undefined ? "" : val),
      z.string().min(1, "Debe seleccionar un voluntario válido").transform((val) => parseInt(val, 10))
    ),
  items: z.array(MovementDetailSchema)
    .min(1, "Debe agregar al menos un elemento"),
});

export type BatchItemWithdrawalForm = z.infer<typeof BatchItemWithdrawalSchema>;

export const ExtractableItemSchema = z.object({
  itemId: z.number(),
  name: z.string(),
  quantity: z.number(),
  assignedQuantity: z.number(),
  availableQuantity: z.number(),
});
export type ExtractableItem = z.infer<typeof ExtractableItemSchema>;
