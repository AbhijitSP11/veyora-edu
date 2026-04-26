import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchBar } from '@/components/shared/SearchBar';
import { CLASS_LIST, SECTION_LIST } from '@/config/constants';

interface StudentFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  class_: string;
  onClassChange: (v: string) => void;
  section: string;
  onSectionChange: (v: string) => void;
  status: string;
  onStatusChange: (v: string) => void;
}

export function StudentFilters({
  search, onSearchChange, class_, onClassChange,
  section, onSectionChange, status, onStatusChange,
}: StudentFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchBar
        value={search}
        onChange={onSearchChange}
        placeholder="Search students..."
        className="w-64"
      />
      <Select value={class_} onValueChange={onClassChange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="All Classes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Classes</SelectItem>
          {CLASS_LIST.map((c) => (
            <SelectItem key={c} value={c}>Class {c}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={section} onValueChange={onSectionChange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="All Sections" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sections</SelectItem>
          {SECTION_LIST.map((s) => (
            <SelectItem key={s} value={s}>Section {s}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="INACTIVE">Inactive</SelectItem>
          <SelectItem value="TRANSFERRED">Transferred</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
