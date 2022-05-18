import { Types } from 'mongoose';
import { ToDo, ToDoSchema } from '../interfaces/ToDoInterface';
import ServiceError from '../interfaces/ServiceErrors';
import ToDoModel from '../database/models/ToDo';

class ToDoService {
  model: ToDoModel;

  constructor(model = new ToDoModel()) {
    this.model = model;
  }

  async create(data: ToDo): Promise<ToDo | ServiceError> {
    const parsed = ToDoSchema.safeParse(data);
    if (!parsed.success) return { error: parsed.error };
    const created = await this.model.create(data);
    return created;
  }

  async readOne(id: string): Promise<ToDo | ServiceError | null | undefined> {
    if (!id) return null;
    if (new Types.ObjectId().toString().length !== id.length) return undefined;
    const found = await this.model.readOne(id);
    return found;
  }
}

export default ToDoService;