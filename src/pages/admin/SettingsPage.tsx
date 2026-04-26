import { PageHeader } from '@/components/shared/PageHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Configure your school portal"
        breadcrumbs={[{ label: 'Dashboard', href: '../dashboard' }, { label: 'Settings' }]}
      />

      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="text-base font-semibold text-gray-900">School Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">School Name</label>
            <Input placeholder="ABC Public School" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Principal Name</label>
            <Input placeholder="Dr. Rajesh Kumar" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Phone</label>
            <Input placeholder="9876543210" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
            <Input type="email" placeholder="school@example.com" />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Address</label>
            <Input placeholder="123 School Road, City" />
          </div>
        </div>
        <Button>Save Changes</Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="text-base font-semibold text-gray-900">Academic Year</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Current Academic Year</label>
            <Input placeholder="2025-26" />
          </div>
        </div>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
