// importing only Router from express
import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverersController from './app/controllers/DeliverersController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliverers', DeliverersController.index);
routes.post('/deliverers', DeliverersController.store);
routes.put('/deliverers/:id', DeliverersController.update);
routes.delete('/deliverers/:id', DeliverersController.delete);

export default routes;
