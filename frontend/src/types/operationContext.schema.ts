import { z } from "zod";

// Esquema base solo para el nombre
const NameSchema = z.object({
  name: z.string(),
});

// Lista de departamentos
export const DepartmentSchema = NameSchema.extend({
  departmentId: z.number(),
});

// Lista de provincias
export const ProvinceSchema = NameSchema.extend({
  provinceId: z.number(),
  departmentId: z.number(),
});

// Lista de municipios
export const MunicipalitySchema = NameSchema.extend({
  municipalityId: z.number(),
  provinceId: z.number(),
});

// Lista de categorías
export const OperationCategorySchema = NameSchema.extend({
  operationCategoryId: z.number(),
});

export type OperationCategory = z.infer<typeof OperationCategorySchema>;

// Lista de tipos de operactiones
export const OperationTypeSchema = NameSchema.extend({
  operationTypeId: z.number(),
  operationCategoryId: z.number(),
});

// Contexto para filtros de operaciones
export const OperationContextSchema = z.object({
  municipalities: z.array(MunicipalitySchema),
  operationCategories: z.array(OperationCategorySchema),
});

// Tipos para contexto de filtros de operaciones
export type OperationContext = z.infer<typeof OperationContextSchema>;

// Voluntarios con rango
export const VolunteerWithRankSchema = z.object({
  volunteerId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  gradeName: z.string(),
  abbreviation: z.string(),
});

// Tipos para voluntarios con rango
export type VolunteerWithRank = z.infer<typeof VolunteerWithRankSchema>;
export type VolunteerWithRankList = VolunteerWithRank[];

// Militares con rango
export const MilitaryWithRankSchema = z.object({
  militaryId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  rankName: z.string(),
  abbreviation: z.string(),
});

// Tipos para militares con rango
export type MilitaryWithRank = z.infer<typeof MilitaryWithRankSchema>;
export type MilitaryWithRankList = MilitaryWithRank[];


// Contexto para creación de operaciones
export const CreateOperationContextSchema = z.object({
  departments: z.array(DepartmentSchema),
  provinces: z.array(ProvinceSchema),
  municipalities: z.array(MunicipalitySchema),
  operationCategories: z.array(OperationCategorySchema),
  operationTypes: z.array(OperationTypeSchema),
});

// Tipos para contexto de creación de operaciones
export type CreateOperationContext = z.infer<typeof CreateOperationContextSchema>;