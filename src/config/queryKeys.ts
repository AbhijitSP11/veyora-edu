export const queryKeys = {
  students: {
    all: (schoolId: string) => ['students', schoolId] as const,
    list: (schoolId: string, filters?: Record<string, unknown>) =>
      ['students', schoolId, 'list', filters] as const,
    detail: (schoolId: string, studentId: string) =>
      ['students', schoolId, 'detail', studentId] as const,
    documents: (schoolId: string, studentId: string) =>
      ['students', schoolId, studentId, 'documents'] as const,
  },
  notifications: {
    list: (schoolId: string, filters?: Record<string, unknown>) =>
      ['notifications', schoolId, 'list', filters] as const,
    detail: (schoolId: string, id: string) =>
      ['notifications', schoolId, 'detail', id] as const,
  },
  fees: {
    list: (schoolId: string, filters?: Record<string, unknown>) =>
      ['fees', schoolId, 'list', filters] as const,
    summary: (schoolId: string) => ['fees', schoolId, 'summary'] as const,
  },
  attendance: {
    daily: (schoolId: string, date: string, class_: string, section: string) =>
      ['attendance', schoolId, 'daily', date, class_, section] as const,
    report: (schoolId: string, studentId: string, month: number, year: number) =>
      ['attendance', schoolId, 'report', studentId, month, year] as const,
    summary: (schoolId: string, class_: string, section: string, month: number, year: number) =>
      ['attendance', schoolId, 'summary', class_, section, month, year] as const,
  },
  exams: {
    list: (schoolId: string, academicYear?: string) =>
      ['exams', schoolId, 'list', academicYear] as const,
    detail: (schoolId: string, examId: string) =>
      ['exams', schoolId, 'detail', examId] as const,
  },
  marks: {
    list: (schoolId: string, examId: string, class_: string, section: string, subject?: string) =>
      ['marks', schoolId, 'list', examId, class_, section, subject] as const,
    reportCard: (schoolId: string, studentId: string, examId: string) =>
      ['marks', schoolId, 'reportCard', studentId, examId] as const,
    classResult: (schoolId: string, examId: string, class_: string, section: string) =>
      ['marks', schoolId, 'classResult', examId, class_, section] as const,
  },
  subjects: {
    list: (schoolId: string, class_?: string) =>
      ['subjects', schoolId, 'list', class_] as const,
  },
  schools: {
    all: () => ['schools'] as const,
    detail: (schoolId: string) => ['schools', 'detail', schoolId] as const,
    stats: (schoolId: string) => ['schools', 'stats', schoolId] as const,
  },
} as const;
