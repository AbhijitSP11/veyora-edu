import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { BookOpen } from 'lucide-react';

export function MyMarks() {
  return (
    <div className="space-y-6">
      <PageHeader title="My Marks" breadcrumbs={[{ label: 'Dashboard', href: '../dashboard' }, { label: 'Marks' }]} />
      <div className="bg-white rounded-xl border border-gray-100">
        <EmptyState
          icon={<BookOpen className="size-8" />}
          title="No marks published yet"
          description="Your marks will appear here once your teacher publishes exam results."
        />
      </div>
    </div>
  );
}
