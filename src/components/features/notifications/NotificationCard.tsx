import { Users, Megaphone, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDateTime } from '@/lib/utils';
import type { Notification } from '@/types/models';

interface NotificationCardProps {
  notification: Notification;
}

const TYPE_CONFIG = {
  BROADCAST: { icon: <Megaphone className="size-4" />, label: 'Broadcast', variant: 'info' as const },
  CLASS: { icon: <Users className="size-4" />, label: 'Class', variant: 'primary' as const },
  PERSONAL: { icon: <User className="size-4" />, label: 'Personal', variant: 'default' as const },
};

export function NotificationCard({ notification }: NotificationCardProps) {
  const config = TYPE_CONFIG[notification.type];

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-card-hover transition-shadow">
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center size-9 rounded-lg bg-primary-light text-primary shrink-0 mt-0.5">
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h4 className="text-sm font-semibold text-gray-900">{notification.title}</h4>
            <Badge variant={config.variant}>{config.label}</Badge>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{notification.body}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-gray-400">{formatDateTime(notification.createdAt)}</span>
            <div className="flex items-center gap-1">
              {notification.sentVia.map((ch) => (
                <span key={ch} className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                  {ch}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
