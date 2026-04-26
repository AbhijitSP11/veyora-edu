import { Download } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';

const REPORTS = [
  { title: 'Student Directory', desc: 'Complete list of all students with contact information.', formats: ['Excel', 'PDF'] },
  { title: 'Attendance Summary', desc: 'Class-wise attendance percentage for any date range.', formats: ['Excel', 'PDF'] },
  { title: 'Fee Collection Report', desc: 'Collected vs pending fees by class or student.', formats: ['Excel', 'PDF'] },
  { title: 'Marks & Results', desc: 'Exam-wise results for any class and section.', formats: ['Excel', 'PDF'] },
];

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Download school data as Excel or PDF"
        breadcrumbs={[{ label: 'Dashboard', href: '../dashboard' }, { label: 'Reports' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REPORTS.map((report) => (
          <div key={report.title} className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-1">{report.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{report.desc}</p>
            <div className="flex items-center gap-2">
              {report.formats.map((fmt) => (
                <Button key={fmt} variant="secondary" size="sm">
                  <Download className="size-4" /> {fmt}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
