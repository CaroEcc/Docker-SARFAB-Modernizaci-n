import api from "@/lib/axios";
import { NotificationList } from "@/types/notification.schema";
import { isAxiosError } from "axios";

export async function getNotifications(): Promise<NotificationList> {
  try {
    const { data } = await api.get("/Notification");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function getUnreadNotifications(): Promise<NotificationList> {
  try {
    const { data } = await api.get("/Notification/unread");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function markNotificationAsRead(id: number): Promise<void> {
  try {
    await api.patch(`/Notification/${id}/read`);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function deleteNotification(id: number): Promise<void> {
  try {
    await api.patch(`/Notification/${id}/delete`);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

