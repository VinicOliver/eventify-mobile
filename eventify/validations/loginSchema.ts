import * as z from 'zod/v4';

export const LoginSchema = z.object({
  email: z.email('E-mail deve ser um e-mail válido'),
  password: z.string().trim().min(6, 'A senha deve conter no mínimo 6 caracteres')
});