import { Schema, model as createModel, Document } from 'mongoose';
import MongoModel from './Model';
import { ToDo } from '../../interfaces/ToDoInterface';

interface ToDoDocument extends ToDo, Document {}

const ToDoSchema = new Schema<ToDoDocument>(
  {
    status: String,
    title: String,
    description: String,
    dueDate: Date,
  },
  {
    versionKey: false,
  },
);

class ToDoModel extends MongoModel<ToDo> {
  constructor(model = createModel('ToDo', ToDoSchema)) {
    super(model);
  }
}

export default ToDoModel;