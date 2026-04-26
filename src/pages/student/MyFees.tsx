import { PageHeader } from '@/components/shared/PageHeader';
import { FeeTable } from '@/components/features/fees/FeeTable';

export function MyFees() {
  return (
    <div className="space-y-6">
      <PageHeader title="My Fees" breadcrumbs={[{ label: 'Dashboard', href: '../dashboard' }, { label: 'Fees' }]} />
      <FeeTable fees={[]} isLoading={false} />
    </div>
  );
}
