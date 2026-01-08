import { z } from 'zod';
import { emailSchema, cpfSchema, phoneSchema, nonEmptyStringSchema } from './common';

export const createUserSchema = z.object({
  name: nonEmptyStringSchema.min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: emailSchema,
  cpf: cpfSchema.optional(),
  phone: phoneSchema.optional(),
  password: z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'Senha deve conter pelo menos um número'),
  confirmPassword: z.string(),
}).refine((data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

export const updateUserSchema = z.object({
  name: nonEmptyStringSchema.min(2, 'Nome deve ter no mínimo 2 caracteres').optional(),
  email: emailSchema.optional(),
  phone: phoneSchema.optional(),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Senha é obrigatória'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
