import App from './App';
import GenericRouter from '../routes/Routes';
import ToDoController from '../controllers/ToDo';

const server = new App();
const toDoController = new ToDoController();
const toDoRoute = new GenericRouter();

toDoRoute.addRoutes(toDoController);
server.addRouter(toDoRoute.router);

export default server;