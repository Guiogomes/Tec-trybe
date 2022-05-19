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

  async read(): Promise<ToDo[]> {
    const all = await this.model.read();
    return all;
  }

  async deleteToDo(id: string)
    : Promise<ToDo | ServiceError | null | undefined> {
    if (!id) return null;
    if (new Types.ObjectId().toString().length !== id.length) return undefined;
    const deleted = await this.model.delete(id);
    return deleted;
  }

  async update(id: string, data: ToDo)
    : Promise<ToDo | ServiceError | null | undefined> {
    if (!id) return null;
    if (new Types.ObjectId().toString().length !== id.length) return undefined;
    const updated = await this.model.update(id, data);
    return updated;
  }
}

export default ToDoService;