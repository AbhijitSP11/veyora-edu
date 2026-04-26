import { useState } from 'react';
import { Check, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Student } from '@/types/models';
import type { AttendanceStatus } from '@/types/enums';

interface AttendanceRecord {
  studentId: string;
  status: AttendanceStatus;
  remarks?: string;
}

interface AttendanceMarkerProps {
  students: Student[];
  onSave: (records: AttendanceRecord[]) => void;
  isLoading?: boolean;
}

const STATUS_OPTIONS: { value: AttendanceStatus; label: string; color: string; icon: React.ReactNode }[] = [
  { value: 'PRESENT', label: 'P', color: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 hover:bg-emerald-100', icon: <Check className="size-3" /> },
  { value: 'ABSENT', label: 'A', color: 'bg-red-50 text-red-700 ring-red-600/20 hover:bg-red-100', icon: <X className="size-3" /> },
  { value: 'LATE', label: 'L', color: 'bg-amber-50 text-amber-700 ring-amber-600/20 hover:bg-amber-100', icon: <Clock className="size-3" /> },
];

export function AttendanceMarker({ students, onSave, isLoading }: AttendanceMarkerProps) {
  const [records, setRecords] = useState<Record<string, AttendanceStatus>>(
    Object.fromEntries(students.map((s) => [s.id, 'PRESENT' as AttendanceStatus])),
  );

  const setStatus = (studentId: string, status: AttendanceStatus) => {
    setRecords((prev) => ({ ...prev, [studentId]: status }));
  };

  const markAll = (status: AttendanceStatus) => {
    setRecords(Object.fromEntries(students.map((s) => [s.id, status])));
  };

  const counts = {
    PRESENT: Object.values(records).filter((s) => s === 'PRESENT').length,
    ABSENT: Object.values(records).filter((s) => s === 'ABSENT').length,
    LATE: Object.values(records).filter((s) => s === 'LATE').length,
  };

  const handleSave = () => {
    onSave(students.map((s) => ({ studentId: s.id, status: records[s.id] ?? 'PRESENT' })));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm text-gray-600">Quick mark all:</span>
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => markAll(opt.value)}
            className={cn('text-xs px-3 py-1.5 rounded-full ring-1 font-medium transition-colors', opt.color)}
          >
            Mark All {opt.value.charAt(0) + opt.value.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Roll No</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-500">{idx + 1}</td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-gray-900">{student.name}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-mono text-gray-500">{student.rollNumber}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {STATUS_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setStatus(student.id, opt.value)}
                        className={cn(
                          'flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ring-1 transition-all',
                          records[student.id] === opt.value
                            ? opt.color + ' ring-2 scale-105'
                            : 'bg-gray-100 text-gray-500 ring-gray-300 hover:bg-gray-200',
                        )}
                      >
                        {opt.icon}
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-emerald-600 font-medium">{counts.PRESENT} Present</span>
          <span className="text-red-600 font-medium">{counts.ABSENT} Absent</span>
          <span className="text-amber-600 font-medium">{counts.LATE} Late</span>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Attendance'}
        </Button>
      </div>
    </div>
  );
}
