import { z } from "zod";

export const NotificationSchema = z.object({
  id: z.number(),
  volunteerId: z.number(),
  message: z.string(),
  type: z.string(),
  relatedEntityId: z.number().nullable().optional(),
  daysBeforeExpiration: z.number().nullable().optional(),
  wasRead: z.boolean(),
  sentAt: z.string(),
  status: z.number(),
});

export const NotificationListSchema = z.array(NotificationSchema);

export type Notification = z.infer<typeof NotificationSchema>;
export type NotificationList = z.infer<typeof NotificationListSchema>;
