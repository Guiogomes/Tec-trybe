import { z } from 'zod';

export const ToDoSchema = z.object({
  status: z.enum(['Pendente', 'Em andamento', 'Concluído']),
  title: z.string({
    required_error: 'Título da tarefa é obrigatório',
    invalid_type_error: 'Título da tarefa deve ser uma string',
  }),
  description: z.string(),
  dueDate: z.date(),
});

export type ToDo = z.TypeOf<typeof ToDoSchema>;