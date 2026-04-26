import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useExams } from '@/hooks/useMarks';
import { ACADEMIC_YEARS, CLASS_LIST, SECTION_LIST } from '@/config/constants';

interface ExamSelectorProps {
  examId: string;
  onExamChange: (v: string) => void;
  class_: string;
  onClassChange: (v: string) => void;
  section: string;
  onSectionChange: (v: string) => void;
  subject?: string;
  onSubjectChange?: (v: string) => void;
}

export function ExamSelector({
  examId, onExamChange, class_, onClassChange, section, onSectionChange,
}: ExamSelectorProps) {
  const { data } = useExams(ACADEMIC_YEARS[1]);
  const exams = data?.success ? data.data : [];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select value={examId} onValueChange={onExamChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select Exam" />
        </SelectTrigger>
        <SelectContent>
          {exams.map((exam) => (
            <SelectItem key={exam.id} value={exam.id}>{exam.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={class_} onValueChange={onClassChange}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Select Class" />
        </SelectTrigger>
        <SelectContent>
          {CLASS_LIST.map((c) => <SelectItem key={c} value={c}>Class {c}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={section} onValueChange={onSectionChange}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Select Section" />
        </SelectTrigger>
        <SelectContent>
          {SECTION_LIST.map((s) => <SelectItem key={s} value={s}>Section {s}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}
