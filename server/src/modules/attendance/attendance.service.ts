import { PrismaClient } from '@prisma/client';
import type { MarkAttendanceInput } from './attendance.schema.js';
import { startOfMonth, endOfMonth } from 'date-fns';

const prisma = new PrismaClient();

export async function markAttendance(schoolId: string, markedById: string, input: MarkAttendanceInput) {
  const date = new Date(input.date);

  const operations = input.records.map((rec) =>
    prisma.attendance.upsert({
      where: {
        schoolId_studentId_date: { schoolId, studentId: rec.studentId, date },
      },
      create: { schoolId, studentId: rec.studentId, date, status: rec.status as never, markedById, remarks: rec.remarks },
      update: { status: rec.status as never, markedById, remarks: rec.remarks },
    }),
  );

  return prisma.$transaction(operations);
}

export async function getStudentAttendanceReport(
  schoolId: string,
  studentId: string,
  month: number,
  year: number,
) {
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(start);

  return prisma.attendance.findMany({
    where: {
      schoolId,
      studentId,
      date: { gte: start, lte: end },
    },
    orderBy: { date: 'asc' },
  });
}
