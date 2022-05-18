import { z } from 'zod';

export const ToDoSchema = z.object({
  status: z
    .enum(['Pendente', 'Em andamento', 'Concluído'])
    .optional()
    .default('Pendente'),
  title: z.string({
    required_error: 'Título da tarefa é obrigatório',
    invalid_type_error: 'Título da tarefa deve ser uma string',
  }),
  description: z.string().optional(),
  dueDate: z.date(),
});

export type ToDo = z.TypeOf<typeof ToDoSchema>;