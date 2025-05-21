import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '@/api/NotificationAPI';
import { NotificationList } from '@/types/notification.schema';

interface NotificationQueryOptions {
  enableAutoRefetch?: boolean;
  refetchIntervalMs?: number;
  refetchOnFocus?: boolean;
}

export const useAllNotifications = (options: NotificationQueryOptions = {}) => {
  const {
    enableAutoRefetch = false,
    refetchIntervalMs = 300000,
    refetchOnFocus = true,
  } = options;

  return useQuery<NotificationList, Error>({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    refetchInterval: enableAutoRefetch ? refetchIntervalMs : false,
    refetchIntervalInBackground: enableAutoRefetch,
    refetchOnWindowFocus: refetchOnFocus,
    staleTime: 60000,
  });
};
