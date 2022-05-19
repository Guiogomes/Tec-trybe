import { Router } from 'express';
import ToDoController from '../controllers/ToDo';

class GenericRouter {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoutes(
    controller: ToDoController,
    route: string = controller.route,
  ): void {
    this.router.get(`${route}`, controller.read);
    // this.router.get(`${route}/:id`, controller.readOne);
    this.router.post(`${route}`, controller.create);
    this.router.put(`${route}/:id`, controller.update);
    this.router.delete(`${route}/:id`, controller.deleteTodo);
  }
}

export default GenericRouter;