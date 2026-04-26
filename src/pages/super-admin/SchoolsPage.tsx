import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { DataTable, type Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatDate } from '@/lib/utils';
import type { School } from '@/types/models';

export function SchoolsPage() {
  const columns: Column<School>[] = [
    {
      key: 'name',
      header: 'School',
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-500 font-mono">{row.slug}</p>
        </div>
      ),
    },
    { key: 'city', header: 'City', render: (row) => <span className="text-sm">{row.city}, {row.state}</span> },
    { key: 'plan', header: 'Plan', render: (row) => <span className="text-sm capitalize">{row.subscriptionPlan}</span> },
    { key: 'expiry', header: 'Expiry', render: (row) => <span className="text-sm">{formatDate(row.subscriptionExpiry)}</span> },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.isActive ? 'ACTIVE' : 'INACTIVE'} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Schools"
        description="Manage all school tenants on the platform"
        actions={
          <Button size="sm">
            <Plus className="size-4" /> Onboard School
          </Button>
        }
      />
      <DataTable columns={columns} data={[]} isLoading={false} emptyTitle="No schools yet" emptyDescription="Click 'Onboard School' to add the first school." />
    </div>
  );
}
