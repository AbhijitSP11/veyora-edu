import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import jwt from '@fastify/jwt';
import rateLimit from '@fastify/rate-limit';
import { env } from './config/env.js';
import { authRoutes } from './modules/auth/auth.routes.js';
import { studentRoutes } from './modules/student/student.routes.js';
import { attendanceRoutes } from './modules/attendance/attendance.routes.js';
import { marksRoutes } from './modules/marks/marks.routes.js';
import { notificationRoutes } from './modules/notification/notification.routes.js';

const app = Fastify({ logger: env.NODE_ENV === 'development' });

await app.register(cors, {
  origin: env.FRONTEND_URL,
  credentials: true,
});

await app.register(helmet);

await app.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
});

await app.register(jwt, {
  secret: env.JWT_ACCESS_SECRET,
});

// Tenant context decorator
app.addHook('preHandler', async (request) => {
  const slug = request.headers['x-school-slug'] as string | undefined;
  (request as unknown as { schoolSlug: string | undefined }).schoolSlug = slug;
});

// Routes
await app.register(authRoutes, { prefix: '/api/v1/auth' });
await app.register(studentRoutes, { prefix: '/api/v1/students' });
await app.register(attendanceRoutes, { prefix: '/api/v1/attendance' });
await app.register(marksRoutes, { prefix: '/api/v1/marks' });
await app.register(notificationRoutes, { prefix: '/api/v1/notifications' });

// Health check
app.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

// Global error handler
app.setErrorHandler((error, _request, reply) => {
  app.log.error(error);
  reply.status(error.statusCode ?? 500).send({
    success: false,
    error: {
      code: error.code ?? 'INTERNAL_ERROR',
      message: env.NODE_ENV === 'production' ? 'Internal server error' : error.message,
    },
  });
});

const port = parseInt(env.PORT, 10);
await app.listen({ port, host: '0.0.0.0' });
console.log(`Server running on http://localhost:${port}`);
