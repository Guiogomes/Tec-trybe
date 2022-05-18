import { Request, Response } from 'express';
import ToDoService from '../services/ToDo';
import ControllerErrors from '../enums/ControllerErrors';
import StatusCode from '../enums/StatusCode';
import { ToDo } from '../interfaces/ToDoInterface';

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

  
}