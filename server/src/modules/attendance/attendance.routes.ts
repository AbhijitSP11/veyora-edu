import type { FastifyInstance } from 'fastify';
import { markAttendanceSchema, attendanceReportQuerySchema } from './attendance.schema.js';
import { markAttendance, getStudentAttendanceReport } from './attendance.service.js';

export async function attendanceRoutes(app: FastifyInstance): Promise<void> {
  app.post('/', async (request, reply) => {
    const schoolId = (request as unknown as { schoolId: string }).schoolId ?? '';
    const userId = (request as unknown as { userId: string }).userId ?? '';
    const body = markAttendanceSchema.parse(request.body);
    const result = await markAttendance(schoolId, userId, body);
    return reply.send({ success: true, data: result });
  });

  app.get('/report', async (request, reply) => {
    const schoolId = (request as unknown as { schoolId: string }).schoolId ?? '';
    const query = attendanceReportQuerySchema.parse(request.query);
    const result = await getStudentAttendanceReport(schoolId, query.studentId, query.month, query.year);
    return reply.send({ success: true, data: result });
  });
}
