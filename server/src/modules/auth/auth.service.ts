import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import type { FastifyInstance } from 'fastify';
import { env } from '../../config/env.js';
import type { LoginBody } from './auth.schema.js';

const prisma = new PrismaClient();

export async function loginService(app: FastifyInstance, body: LoginBody) {
  const { email, password, schoolSlug } = body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.isActive) {
    throw Object.assign(new Error('Invalid credentials'), { statusCode: 401, code: 'INVALID_CREDENTIALS' });
  }

  if (schoolSlug) {
    const school = await prisma.school.findUnique({ where: { slug: schoolSlug } });
    if (!school || school.id !== user.schoolId) {
      throw Object.assign(new Error('Invalid school code'), { statusCode: 401, code: 'INVALID_SCHOOL' });
    }
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw Object.assign(new Error('Invalid credentials'), { statusCode: 401, code: 'INVALID_CREDENTIALS' });
  }

  const accessToken = app.jwt.sign(
    { userId: user.id, schoolId: user.schoolId, role: user.role },
    { expiresIn: env.JWT_ACCESS_EXPIRY },
  );

  const refreshToken = app.jwt.sign(
    { userId: user.id, type: 'refresh' },
    { expiresIn: env.JWT_REFRESH_EXPIRY },
  );

  const school = user.schoolId
    ? await prisma.school.findUnique({ where: { id: user.schoolId }, select: { slug: true } })
    : null;

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      schoolId: user.schoolId,
    },
    schoolSlug: school?.slug,
  };
}
