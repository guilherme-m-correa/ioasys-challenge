import UsersController from '@controllers/UsersController';

import createUserValidator from '@validators/CreateUserValidator';
import authenticateUserValidator from '@validators/AuthenticateUserValidator';
import createMovieValidator from '@validators/CreateMovieValidator';
import createRatingValidator from '@validators/CreateRatingValidator';
import SessionController from '@controllers/SessionController';
import MoviesController from '@controllers/MoviesController';
import RatingsController from '@controllers/RatingsController';
import auth from '@middlewares/AuthMiddleware';
import { Router } from 'express';

const routes = Router();

const usersController = new UsersController();
const sessionController = new SessionController();
const moviesController = new MoviesController();
const ratingsController = new RatingsController();

routes.post('/users', createUserValidator, usersController.store);
routes.put('/users/:id', usersController.update);
routes.delete('/users/:id', usersController.delete);

routes.post('/sessions', authenticateUserValidator, sessionController.store);

routes.post('/movies', auth, createMovieValidator, moviesController.store);
routes.get('/movies', moviesController.index);
routes.get('/movies/:id', moviesController.show);

routes.post('/ratings', auth, createRatingValidator, ratingsController.store);

export default routes;
