import CreateRatingService from '@services/CreateRatingService';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

export default class RatingController {
  public async store(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const createRatingService = container.resolve(CreateRatingService);

      const userId = request.user.id;

      const { movieId, score } = request.body;

      const rating = await createRatingService.execute({
        userId,
        movieId,
        score,
      });

      return response.status(201).json(rating);
    } catch (error) {
      return next(error);
    }
  }
}
