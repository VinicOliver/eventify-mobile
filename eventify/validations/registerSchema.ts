import * as z from "zod/v4";

export const RegisterSchema = z.object({
  name: z.string('O nome deve ser conter somente caracteres').trim().min(1, 'Nome deve conter no mínimo 1 caracter'),
  email: z.email('E-mail deve ser um e-mail válido'),
  password: z.string().trim().min(6, 'A senha deve conter no mínimo 6 caracteres'),
  organizer: z.boolean()
})
