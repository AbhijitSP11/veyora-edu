import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { NotificationComposer } from '@/components/features/notifications/NotificationComposer';
import { NotificationCard } from '@/components/features/notifications/NotificationCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Bell } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useNotifications } from '@/hooks/useNotifications';
import type { Notification } from '@/types/models';

export function NotificationsPage() {
  const [tab, setTab] = useState('sent');
  const { data, isLoading } = useNotifications();

  const notifications: Notification[] = data?.success ? (data.data as Notification[]) : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Send and manage announcements"
        breadcrumbs={[{ label: 'Dashboard', href: '../dashboard' }, { label: 'Notifications' }]}
      />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
        </TabsList>

        <TabsContent value="compose">
          <NotificationComposer />
        </TabsContent>

        <TabsContent value="sent">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 w-full" />)}
            </div>
          ) : notifications.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100">
              <EmptyState
                icon={<Bell className="size-8" />}
                title="No notifications sent yet"
                description="Use the Compose tab to send your first notification."
                action={{ label: 'Compose', onClick: () => setTab('compose') }}
              />
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((n) => <NotificationCard key={n.id} notification={n} />)}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
