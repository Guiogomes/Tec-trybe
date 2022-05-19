import { Types } from 'mongoose';
import { ToDo } from '../../interfaces/ToDoInterface';

export const sucessToDoCreated = {
  _id: new Types.ObjectId(),
  description: 'Descrição da tarefa 1',
  dueDate: '2020-01-01',
  title: 'Tarefa 1',
  status: 'Pendente',
} as ToDo;

export const errorToDoCreated = {};