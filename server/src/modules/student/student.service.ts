import { PrismaClient, Prisma } from '@prisma/client';
import type { CreateStudentInput, ListStudentsQuery } from './student.schema.js';

const prisma = new PrismaClient();

export async function listStudents(schoolId: string, query: ListStudentsQuery) {
  const { class: cls, section, search, status, page, limit } = query;
  const skip = (page - 1) * limit;

  const where: Prisma.StudentWhereInput = {
    schoolId,
    deletedAt: null,
    ...(cls && { class: cls }),
    ...(section && { section }),
    ...(status && { status: status as never }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { rollNumber: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { parentPhone: { contains: search } },
      ],
    }),
  };

  const [data, total] = await Promise.all([
    prisma.student.findMany({ where, skip, take: limit, orderBy: { rollNumber: 'asc' } }),
    prisma.student.count({ where }),
  ]);

  return { data, meta: { page, limit, total } };
}

export async function getStudent(schoolId: string, studentId: string) {
  const student = await prisma.student.findFirst({
    where: { id: studentId, schoolId, deletedAt: null },
  });
  if (!student) throw Object.assign(new Error('Student not found'), { statusCode: 404, code: 'STUDENT_NOT_FOUND' });
  return student;
}

export async function createStudent(schoolId: string, input: CreateStudentInput) {
  return prisma.student.create({
    data: {
      ...input,
      schoolId,
      dateOfBirth: new Date(input.dateOfBirth),
      admissionDate: new Date(input.admissionDate),
    },
  });
}

export async function updateStudent(schoolId: string, studentId: string, input: Partial<CreateStudentInput>) {
  await getStudent(schoolId, studentId);
  return prisma.student.update({
    where: { id: studentId },
    data: {
      ...input,
      ...(input.dateOfBirth && { dateOfBirth: new Date(input.dateOfBirth) }),
      ...(input.admissionDate && { admissionDate: new Date(input.admissionDate) }),
    },
  });
}

export async function softDeleteStudent(schoolId: string, studentId: string) {
  await getStudent(schoolId, studentId);
  return prisma.student.update({
    where: { id: studentId },
    data: { deletedAt: new Date(), status: 'INACTIVE' },
  });
}
