import CreateMovieService from '@services/CreateMovieService';
import ListMoviesService from '@services/ListMoviesService';
import ShowMovieService from '@services/ShowMovieService';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

export default class MoviesController {
  public async index(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const listMoviesService = container.resolve(ListMoviesService);

      const data = request.query;

      const movie = await listMoviesService.execute(data);

      return response.status(200).json(movie);
    } catch (error) {
      return next(error);
    }
  }

  public async store(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const createMovieService = container.resolve(CreateMovieService);

      const userId = request.user.id;

      const {
        name,
        description,
        duration,
        releaseDate,
        directorId,
        actorsIds,
        genresIds,
        writersIds,
      } = request.body;

      const movie = await createMovieService.execute({
        userId,
        name,
        description,
        duration,
        releaseDate,
        directorId,
        actorsIds,
        genresIds,
        writersIds,
      });

      return response.status(201).json(movie);
    } catch (error) {
      return next(error);
    }
  }

  public async show(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const showMovieService = container.resolve(ShowMovieService);

      const { id: movieId } = request.params;

      const movie = await showMovieService.execute({ movieId });

      return response.status(200).json(movie);
    } catch (error) {
      return next(error);
    }
  }
}
