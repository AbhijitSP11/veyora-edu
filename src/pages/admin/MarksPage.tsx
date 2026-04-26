import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { ExamSelector } from '@/components/features/marks/ExamSelector';
import { MarksEntryTable } from '@/components/features/marks/MarksEntryTable';
import { EmptyState } from '@/components/shared/EmptyState';
import { BookOpen } from 'lucide-react';
import { useStudents } from '@/hooks/useStudents';
import { useSaveMarks } from '@/hooks/useMarks';
import type { Student } from '@/types/models';

export function MarksPage() {
  const [examId, setExamId] = useState('');
  const [class_, setClass] = useState('');
  const [section, setSection] = useState('');

  const { data: studentsData } = useStudents(
    class_ && section ? { class: class_, section } : undefined,
  );
  const saveMarks = useSaveMarks();

  const students: Student[] = studentsData?.success ? (studentsData.data as Student[]) : [];

  const handleSave = (records: Array<{ studentId: string; marksObtained: number; isAbsent?: boolean }>, _status: 'DRAFT' | 'PUBLISHED') => {
    if (!examId) return;
    saveMarks.mutate({
      examId,
      subjectId: '',
      entries: records.map((r) => ({ ...r, isAbsent: r.isAbsent ?? false })),
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Marks Entry"
        description="Enter and publish exam marks by subject"
        breadcrumbs={[{ label: 'Dashboard', href: '../dashboard' }, { label: 'Marks' }]}
      />

      <ExamSelector
        examId={examId} onExamChange={setExamId}
        class_={class_} onClassChange={setClass}
        section={section} onSectionChange={setSection}
      />

      {!examId || !class_ || !section ? (
        <div className="bg-white rounded-xl border border-gray-100">
          <EmptyState
            icon={<BookOpen className="size-8" />}
            title="Select exam, class, and section"
            description="Choose the exam, class, and section above to begin entering marks."
          />
        </div>
      ) : (
        <MarksEntryTable
          students={students}
          maxMarks={100}
          onSave={handleSave}
          isLoading={saveMarks.isPending}
        />
      )}
    </div>
  );
}
