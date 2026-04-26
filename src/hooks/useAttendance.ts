import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post, put } from '@/lib/api';
import { queryKeys } from '@/config/queryKeys';
import { useTenant } from './useTenant';
import type { Attendance } from '@/types/models';

interface AttendanceRecord {
  studentId: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY';
  remarks?: string;
}

interface BulkAttendanceInput {
  date: string;
  class: string;
  section: string;
  records: AttendanceRecord[];
}

export function useDailyAttendance(date: string, class_: string, section: string) {
  const { schoolSlug } = useTenant();

  return useQuery({
    queryKey: queryKeys.attendance.daily(schoolSlug, date, class_, section),
    queryFn: () =>
      get<Attendance[]>('/attendance', { class: class_, section, date }),
    enabled: !!schoolSlug && !!date && !!class_ && !!section,
  });
}

export function useAttendanceReport(studentId: string, month: number, year: number) {
  const { schoolSlug } = useTenant();

  return useQuery({
    queryKey: queryKeys.attendance.report(schoolSlug, studentId, month, year),
    queryFn: () => get<Attendance[]>('/attendance/report', { studentId, month, year }),
    enabled: !!schoolSlug && !!studentId,
  });
}

export function useMarkAttendance() {
  const queryClient = useQueryClient();
  const { schoolSlug } = useTenant();

  return useMutation({
    mutationFn: (data: BulkAttendanceInput) => post<Attendance[]>('/attendance', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance', schoolSlug] });
    },
  });
}

export function useUpdateAttendance() {
  const queryClient = useQueryClient();
  const { schoolSlug } = useTenant();

  return useMutation({
    mutationFn: ({ id, ...data }: { id: string; status: string; remarks?: string }) =>
      put<Attendance>(`/attendance/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance', schoolSlug] });
    },
  });
}
