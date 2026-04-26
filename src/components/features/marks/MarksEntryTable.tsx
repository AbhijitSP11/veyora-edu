import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Student } from '@/types/models';

interface MarksRecord {
  studentId: string;
  marksObtained: number;
  isAbsent: boolean;
}

interface MarksEntryTableProps {
  students: Student[];
  maxMarks: number;
  onSave: (records: MarksRecord[], status: 'DRAFT' | 'PUBLISHED') => void;
  isLoading?: boolean;
}

export function MarksEntryTable({ students, maxMarks, onSave, isLoading }: MarksEntryTableProps) {
  const [records, setRecords] = useState<Record<string, { marks: string; absent: boolean }>>(
    Object.fromEntries(students.map((s) => [s.id, { marks: '', absent: false }])),
  );

  const setMarks = (studentId: string, marks: string) => {
    setRecords((prev) => ({ ...prev, [studentId]: { ...prev[studentId], marks } }));
  };

  const toggleAbsent = (studentId: string) => {
    setRecords((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], absent: !prev[studentId].absent, marks: '' },
    }));
  };

  const validMarks = students
    .map((s) => ({
      studentId: s.id,
      marksObtained: parseFloat(records[s.id].marks) || 0,
      isAbsent: records[s.id].absent,
    }))
    .filter((r) => !r.isAbsent);

  const stats = {
    avg: validMarks.length
      ? Math.round(validMarks.reduce((a, r) => a + r.marksObtained, 0) / validMarks.length)
      : 0,
    highest: validMarks.length ? Math.max(...validMarks.map((r) => r.marksObtained)) : 0,
    lowest: validMarks.length ? Math.min(...validMarks.map((r) => r.marksObtained)) : 0,
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Roll No</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Max Marks</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Marks Obtained</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Absent</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => {
              const rec = records[student.id];
              const marksVal = parseFloat(rec.marks);
              const isInvalid = !isNaN(marksVal) && marksVal > maxMarks;

              return (
                <tr key={student.id} className="border-b border-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-500">{idx + 1}</td>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">{student.name}</td>
                  <td className="px-4 py-2 text-sm font-mono text-gray-500">{student.rollNumber}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 font-mono">{maxMarks}</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min={0}
                      max={maxMarks}
                      value={rec.marks}
                      disabled={rec.absent}
                      onChange={(e) => setMarks(student.id, e.target.value)}
                      className={cn(
                        'w-24 h-8 px-2 text-sm rounded-lg border font-mono transition-colors',
                        'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                        isInvalid ? 'border-red-500 bg-red-50' : 'border-gray-300',
                        rec.absent ? 'opacity-40 cursor-not-allowed' : '',
                      )}
                    />
                    {isInvalid && <p className="text-xs text-red-600 mt-0.5">Exceeds max</p>}
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={rec.absent}
                      onChange={() => toggleAbsent(student.id)}
                      className="size-4 rounded border-gray-300 text-primary"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
        <div className="flex items-center gap-6 text-sm">
          <span className="text-gray-600">Avg: <span className="font-semibold text-gray-900">{stats.avg}</span></span>
          <span className="text-gray-600">Highest: <span className="font-semibold text-emerald-600">{stats.highest}</span></span>
          <span className="text-gray-600">Lowest: <span className="font-semibold text-red-600">{stats.lowest}</span></span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => onSave(validMarks, 'DRAFT')}
            disabled={isLoading}
          >
            Save as Draft
          </Button>
          <Button onClick={() => onSave(validMarks, 'PUBLISHED')} disabled={isLoading}>
            {isLoading ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>
    </div>
  );
}
