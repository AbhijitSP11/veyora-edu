import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { FileText } from 'lucide-react';

export function MyDocuments() {
  return (
    <div className="space-y-6">
      <PageHeader title="My Documents" breadcrumbs={[{ label: 'Dashboard', href: '../dashboard' }, { label: 'Documents' }]} />
      <div className="bg-white rounded-xl border border-gray-100">
        <EmptyState icon={<FileText className="size-8" />} title="No documents uploaded" description="Your certificates and documents will appear here." />
      </div>
    </div>
  );
}
