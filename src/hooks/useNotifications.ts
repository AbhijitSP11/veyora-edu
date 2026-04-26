import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post } from '@/lib/api';
import { queryKeys } from '@/config/queryKeys';
import { useTenant } from './useTenant';
import type { Notification } from '@/types/models';
import type { NotificationInput } from '@/lib/validators';

interface NotificationFilters extends Record<string, unknown> {
  type?: string;
  page?: number;
  limit?: number;
}

export function useNotifications(filters?: NotificationFilters) {
  const { schoolSlug } = useTenant();

  return useQuery({
    queryKey: queryKeys.notifications.list(schoolSlug, filters),
    queryFn: () => get<Notification[]>('/notifications', filters),
    enabled: !!schoolSlug,
  });
}

export function useSendNotification() {
  const queryClient = useQueryClient();
  const { schoolSlug } = useTenant();

  return useMutation({
    mutationFn: (data: NotificationInput) => post<Notification>('/notifications', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', schoolSlug] });
    },
  });
}
