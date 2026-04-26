import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sendSchema = z.object({
  title: z.string().min(2),
  body: z.string().min(10),
  type: z.enum(['PERSONAL', 'CLASS', 'BROADCAST']),
  targetClass: z.string().optional(),
  targetSection: z.string().optional(),
  targetStudentId: z.string().optional(),
  sentVia: z.array(z.string()).min(1),
});

export async function notificationRoutes(app: FastifyInstance): Promise<void> {
  app.get('/', async (request, reply) => {
    const schoolId = (request as unknown as { schoolId: string }).schoolId ?? '';
    const query = request.query as { type?: string; page?: string };
    const page = parseInt(query.page ?? '1', 10);
    const limit = 20;

    const notifications = await prisma.notification.findMany({
      where: {
        schoolId,
        ...(query.type && { type: query.type as never }),
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return reply.send({ success: true, data: notifications });
  });

  app.post('/', async (request, reply) => {
    const schoolId = (request as unknown as { schoolId: string }).schoolId ?? '';
    const userId = (request as unknown as { userId: string }).userId ?? '';
    const body = sendSchema.parse(request.body);

    const notification = await prisma.notification.create({
      data: {
        schoolId,
        sentById: userId,
        title: body.title,
        body: body.body,
        type: body.type as never,
        targetClass: body.targetClass,
        targetSection: body.targetSection,
        targetStudentId: body.targetStudentId,
        sentVia: body.sentVia,
      },
    });

    return reply.status(201).send({ success: true, data: notification });
  });
}
