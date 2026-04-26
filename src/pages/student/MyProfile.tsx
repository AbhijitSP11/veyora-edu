import { PageHeader } from '@/components/shared/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { formatDate, getInitials } from '@/lib/utils';

export function MyProfile() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <PageHeader title="My Profile" breadcrumbs={[{ label: 'Dashboard', href: '../dashboard' }, { label: 'Profile' }]} />

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="size-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold font-display">
            {user ? getInitials(user.name) : '?'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-display">{user?.name}</h2>
            <p className="text-sm text-gray-500 capitalize">{user?.role?.toLowerCase()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Email', value: user?.email },
            { label: 'Phone', value: user?.phone ?? '—' },
            { label: 'Role', value: user?.role },
            { label: 'Member Since', value: user?.createdAt ? formatDate(user.createdAt) : '—' },
          ].map((field) => (
            <div key={field.label} className="border border-gray-100 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-0.5">{field.label}</p>
              <p className="text-sm font-medium text-gray-900">{field.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
