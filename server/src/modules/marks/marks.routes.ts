import type { FastifyInstance } from 'fastify';
import { saveMarksSchema, marksQuerySchema } from './marks.schema.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function marksRoutes(app: FastifyInstance): Promise<void> {
  app.get('/', async (request, reply) => {
    const schoolId = (request as unknown as { schoolId: string }).schoolId ?? '';
    const query = marksQuerySchema.parse(request.query);

    const students = await prisma.student.findMany({
      where: { schoolId, class: query.class, section: query.section, deletedAt: null },
      select: { id: true },
    });
    const studentIds = students.map((s) => s.id);

    const marks = await prisma.marks.findMany({
      where: {
        schoolId,
        examId: query.examId,
        studentId: { in: studentIds },
        ...(query.subject && { subject: { code: query.subject } }),
      },
      include: { student: true, subject: true },
    });

    return reply.send({ success: true, data: marks });
  });

  app.post('/', async (request, reply) => {
    const schoolId = (request as unknown as { schoolId: string }).schoolId ?? '';
    const userId = (request as unknown as { userId: string }).userId ?? '';
    const body = saveMarksSchema.parse(request.body);

    const exam = await prisma.exam.findFirst({
      where: { id: body.examId, schoolId },
      include: { school: { include: { gradingScales: { where: { isDefault: true } } } } },
    });
    if (!exam) throw Object.assign(new Error('Exam not found'), { statusCode: 404 });

    const ops = body.entries.map((entry) =>
      prisma.marks.upsert({
        where: { examId_studentId_subjectId: { examId: body.examId, studentId: entry.studentId, subjectId: body.subjectId } },
        create: {
          schoolId, examId: body.examId, studentId: entry.studentId, subjectId: body.subjectId,
          maxMarks: 100, marksObtained: entry.marksObtained, isAbsent: entry.isAbsent,
          enteredById: userId, remarks: entry.remarks,
        },
        update: { marksObtained: entry.marksObtained, isAbsent: entry.isAbsent, remarks: entry.remarks },
      }),
    );

    const result = await prisma.$transaction(ops);
    return reply.send({ success: true, data: result });
  });
}
