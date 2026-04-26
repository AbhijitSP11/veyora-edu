import { useState } from 'react';
import { format } from 'date-fns';
import { PageHeader } from '@/components/shared/PageHeader';
import { AttendanceFilters } from '@/components/features/attendance/AttendanceFilters';
import { AttendanceMarker } from '@/components/features/attendance/AttendanceMarker';
import { EmptyState } from '@/components/shared/EmptyState';
import { ClipboardList } from 'lucide-react';
import { useStudents } from '@/hooks/useStudents';
import { useMarkAttendance } from '@/hooks/useAttendance';
import type { Student } from '@/types/models';

export function AttendancePage() {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [class_, setClass] = useState('');
  const [section, setSection] = useState('');

  const { data: studentsData, isLoading } = useStudents(
    class_ && section ? { class: class_, section } : undefined,
  );
  const markAttendance = useMarkAttendance();

  const students: Student[] = studentsData?.success ? (studentsData.data as Student[]) : [];

  const handleSave = (records: Array<{ studentId: string; status: 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY' }>) => {
    markAttendance.mutate({ date, class: class_, section, records });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance"
        description="Mark daily attendance for your class"
        breadcrumbs={[{ label: 'Dashboard', href: '../dashboard' }, { label: 'Attendance' }]}
      />

      <AttendanceFilters
        date={date} onDateChange={setDate}
        class_={class_} onClassChange={setClass}
        section={section} onSectionChange={setSection}
      />

      {!class_ || !section ? (
        <div className="bg-white rounded-xl border border-gray-100">
          <EmptyState
            icon={<ClipboardList className="size-8" />}
            title="Select class and section"
            description="Choose a class and section above to load the student list for attendance marking."
          />
        </div>
      ) : isLoading ? (
        <div className="text-center py-8 text-gray-500 text-sm">Loading students...</div>
      ) : (
        <AttendanceMarker
          students={students}
          onSave={handleSave}
          isLoading={markAttendance.isPending}
        />
      )}
    </div>
  );
}
