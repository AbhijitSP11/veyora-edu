import { z } from 'zod';

export const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  schoolSlug: z.string().optional(),
});

export const refreshBodySchema = z.object({
  refreshToken: z.string(),
});

export type LoginBody = z.infer<typeof loginBodySchema>;
export type RefreshBody = z.infer<typeof refreshBodySchema>;
