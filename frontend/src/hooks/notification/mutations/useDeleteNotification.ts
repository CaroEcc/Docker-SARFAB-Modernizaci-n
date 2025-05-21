import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNotification } from '@/api/NotificationAPI';
import { toast } from 'react-hot-toast';

/**
 * Hook personalizado para eliminar una notificación
 * @returns Objeto de mutación para eliminar notificación
 */
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notificationId: number) => deleteNotification(notificationId),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unreadNotifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      
      toast.success('Notificación eliminada exitosamente');
    },
    
    onError: () => {
      toast.error('Ocurrió un error al eliminar la notificación');
    },
  });
};
