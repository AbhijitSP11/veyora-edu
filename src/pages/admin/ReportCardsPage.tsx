import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { FileText } from 'lucide-react';

export function ReportCardsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Report Cards"
        description="Generate and download PDF report cards"
        breadcrumbs={[{ label: 'Dashboard', href: '../dashboard' }, { label: 'Report Cards' }]}
      />
      <div className="bg-white rounded-xl border border-gray-100">
        <EmptyState
          icon={<FileText className="size-8" />}
          title="Report cards coming soon"
          description="Select an exam from the Marks page and publish results to generate report cards here."
        />
      </div>
    </div>
  );
}
