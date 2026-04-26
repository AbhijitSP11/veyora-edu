import type { FastifyInstance } from 'fastify';
import { createStudentSchema, listStudentsQuerySchema } from './student.schema.js';
import {
  listStudents, getStudent, createStudent, updateStudent, softDeleteStudent,
} from './student.service.js';

export async function studentRoutes(app: FastifyInstance): Promise<void> {
  app.get('/', async (request, reply) => {
    const schoolId = (request as unknown as { schoolId: string }).schoolId ?? '';
    const query = listStudentsQuerySchema.parse(request.query);
    const result = await listStudents(schoolId, query);
    return reply.send({ success: true, ...result });
  });

  app.get('/:id', async (request, reply) => {
    const schoolId = (request as unknown as { schoolId: string }).schoolId ?? '';
    const { id } = request.params as { id: string };
    const student = await getStudent(schoolId, id);
    return reply.send({ success: true, data: student });
  });

  app.post('/', async (request, reply) => {
    const schoolId = (request as unknown as { schoolId: string }).schoolId ?? '';
    const body = createStudentSchema.parse(request.body);
    const student = await createStudent(schoolId, body);
    return reply.status(201).send({ success: true, data: student });
  });

  app.put('/:id', async (request, reply) => {
    const schoolId = (request as unknown as { schoolId: string }).schoolId ?? '';
    const { id } = request.params as { id: string };
    const body = createStudentSchema.partial().parse(request.body);
    const student = await updateStudent(schoolId, id, body);
    return reply.send({ success: true, data: student });
  });

  app.delete('/:id', async (request, reply) => {
    const schoolId = (request as unknown as { schoolId: string }).schoolId ?? '';
    const { id } = request.params as { id: string };
    await softDeleteStudent(schoolId, id);
    return reply.send({ success: true, data: null });
  });
}
