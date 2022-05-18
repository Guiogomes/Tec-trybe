import App from './app';
import GenericRouter from '../routes/Routes';
import ToDoController from '../controllers/ToDo';
import { ToDo } from '../interfaces/ToDoInterface';

const server = new App();
const toDoController = new ToDoController();
const toDoRoute = new GenericRouter();

toDoRoute.addRoutes(toDoController);
server.addRoutes(toDoRoute.router);

export default server;