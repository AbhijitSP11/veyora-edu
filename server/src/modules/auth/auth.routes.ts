import type { FastifyInstance } from 'fastify';
import { loginBodySchema } from './auth.schema.js';
import { loginService } from './auth.service.js';

export async function authRoutes(app: FastifyInstance): Promise<void> {
  app.post('/login', async (request, reply) => {
    const body = loginBodySchema.parse(request.body);
    const result = await loginService(app, body);
    return reply.send({ success: true, data: result });
  });

  app.post('/logout', async (_request, reply) => {
    return reply.send({ success: true, data: null });
  });
}
