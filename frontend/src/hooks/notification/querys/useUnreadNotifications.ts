import { useQuery } from '@tanstack/react-query';
import { getUnreadNotifications } from '@/api/NotificationAPI';
import { NotificationList } from '@/types/notification.schema';

/**
 * Hook personalizado para obtener notificaciones no leídas
 * @returns Objeto de consulta con notificaciones no leídas
 */
export const useUnreadNotifications = () => {
  return useQuery<NotificationList, Error>({
    queryKey: ['unreadNotifications'],
    queryFn: getUnreadNotifications,
  });
};
