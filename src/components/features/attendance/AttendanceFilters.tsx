import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CLASS_LIST, SECTION_LIST } from '@/config/constants';

interface AttendanceFiltersProps {
  date: string;
  onDateChange: (v: string) => void;
  class_: string;
  onClassChange: (v: string) => void;
  section: string;
  onSectionChange: (v: string) => void;
}

export function AttendanceFilters({
  date, onDateChange, class_, onClassChange, section, onSectionChange,
}: AttendanceFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Input
        type="date"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        className="w-44"
      />
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
