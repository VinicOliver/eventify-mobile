import * as z from 'zod/v4';

export const EventSchema = z.object({
  title: z.string().trim().min(1, 'O título é obrigatório'),
  localization: z.string().trim().min(1, 'A localização é obrigatória'),
  date: z.iso.date('Data deve ser uma data válida').min(1, 'A data é obrigatória'),
  image: z.string(),
  description: z.string(),
});
