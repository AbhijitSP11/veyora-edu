import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post, put } from '@/lib/api';
import { queryKeys } from '@/config/queryKeys';
import { useTenant } from './useTenant';
import type { Marks, Exam } from '@/types/models';

export function useExams(academicYear?: string) {
  const { schoolSlug } = useTenant();

  return useQuery({
    queryKey: queryKeys.exams.list(schoolSlug, academicYear),
    queryFn: () => get<Exam[]>('/exams', academicYear ? { academicYear } : undefined),
    enabled: !!schoolSlug,
  });
}

export function useClassMarks(examId: string, class_: string, section: string, subject?: string) {
  const { schoolSlug } = useTenant();

  return useQuery({
    queryKey: queryKeys.marks.list(schoolSlug, examId, class_, section, subject),
    queryFn: () =>
      get<Marks[]>('/marks', { examId, class: class_, section, ...(subject ? { subject } : {}) }),
    enabled: !!schoolSlug && !!examId && !!class_ && !!section,
  });
}

export function useReportCard(studentId: string, examId: string) {
  const { schoolSlug } = useTenant();

  return useQuery({
    queryKey: queryKeys.marks.reportCard(schoolSlug, studentId, examId),
    queryFn: () => get<Marks[]>(`/marks/report-card/${studentId}`, { examId }),
    enabled: !!schoolSlug && !!studentId && !!examId,
  });
}

export function useSaveMarks() {
  const queryClient = useQueryClient();
  const { schoolSlug } = useTenant();

  return useMutation({
    mutationFn: (records: { examId: string; subjectId: string; entries: Array<{ studentId: string; marksObtained: number; isAbsent?: boolean; remarks?: string }> }) =>
      post<Marks[]>('/marks', records),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marks', schoolSlug] });
    },
  });
}

export function useUpdateMarks() {
  const queryClient = useQueryClient();
  const { schoolSlug } = useTenant();

  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Marks> & { id: string }) =>
      put<Marks>(`/marks/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marks', schoolSlug] });
    },
  });
}
