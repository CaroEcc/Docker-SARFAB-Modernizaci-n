import { z } from 'zod';

export const DemeritPointSchema = z.object({
  volunteerId: z.number(),
  reason: z.string(),
  date: z.string(),
  observation: z.string(),
});

export const demeritPointsListSchema = z.object({
  demeritId: z.number(),
  reason: z.string(),
  date: z.string(),
  pointsLost: z.number(),
  observation: z.string(),
});

export const listDemeritPointsSchema = z.array(demeritPointsListSchema);

export type DemeritPointList = z.infer<typeof demeritPointsListSchema>;
export type DemeritPoint = z.infer<typeof DemeritPointSchema>;