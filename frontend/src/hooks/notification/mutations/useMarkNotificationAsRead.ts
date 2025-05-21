import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markNotificationAsRead } from '@/api/NotificationAPI';

/**
 * Hook personalizado para marcar una notificación como leída
 * @returns Objeto de mutación para marcar notificación como leída
 */
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notificationId: number) => markNotificationAsRead(notificationId),
    onSuccess: () => {
      // Invalidar consultas relacionadas para refrescar los datos
      queryClient.invalidateQueries({ queryKey: ['unreadNotifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
