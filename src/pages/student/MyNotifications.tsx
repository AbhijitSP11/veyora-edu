import { PageHeader } from '@/components/shared/PageHeader';
import { NotificationCard } from '@/components/features/notifications/NotificationCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Bell } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useNotifications } from '@/hooks/useNotifications';
import type { Notification } from '@/types/models';

export function MyNotifications() {
  const { data, isLoading } = useNotifications();
  const notifications: Notification[] = data?.success ? (data.data as Notification[]) : [];

  return (
    <div className="space-y-6">
      <PageHeader title="Notifications" breadcrumbs={[{ label: 'Dashboard', href: '../dashboard' }, { label: 'Notifications' }]} />
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 w-full" />)}
        </div>
      ) : notifications.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100">
          <EmptyState icon={<Bell className="size-8" />} title="No notifications" description="You'll see school announcements here." />
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => <NotificationCard key={n.id} notification={n} />)}
        </div>
      )}
    </div>
  );
}
