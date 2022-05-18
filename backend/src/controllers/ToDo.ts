import { Request, Response } from 'express';
import ToDoService from '../services/ToDo';
import ControllerErrors from '../enums/ControllerErrors';
import StatusCode from '../enums/StatusCode';
import { ToDo } from '../interfaces/ToDoInterface';
import RequestIncrement from '../interfaces/RequestIncrement';

export type ResponseError = {
  error: unknown,
};

class ToDoController {
  service: ToDoService;

  _route: string;

  status = StatusCode;

  errors = ControllerErrors;

  constructor(service = new ToDoService(), route = '/todos') {
    this.service = service;
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestIncrement<ToDo>,
    res: Response<ToDo | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const created = await this.service.create(req.body);
      if (!created) {
        return res.status(this.status.INTERNAL_SERVER_ERROR)
          .json({ error: this.errors.internalServerError });
      }
      if ('error' in created) {
        return res.status(this.status.B_R).json({ error: this.errors.BR });
      }
      return res.status(this.status.CREATED).json(created);
    } catch (e) {
      return res
        .status(this.status.INTERNAL_SERVER_ERROR) 
        .json({ error: this.errors.internalServerError });
    }
  };

  read = async (_req: Request, res: Response) => {
    const ToDos = await this.service.read();
    return res.status(this.status.OK).json(ToDos);
  };
}

export default ToDoController;