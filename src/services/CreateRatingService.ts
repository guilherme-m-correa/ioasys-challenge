import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@contracts/IUsersRepository';
import AppError from '@errors/AppError';
import IMoviesRepository from '@contracts/IMoviesRepository';
import IRatingsRepository from '@contracts/IRatingsRepository';
import Rating from '@entities/Rating';

interface IRequest {
  userId: string;
  movieId: string;
  score: number;
}

@injectable()
class CreateMovieService {
  constructor(
    @inject('UsersRepository')
    private readonly userRepository: IUsersRepository,
    @inject('MoviesRepository')
    private readonly moviesRepository: IMoviesRepository,
    @inject('RatingsRepository')
    private readonly ratingsRepository: IRatingsRepository,
  ) {}

  async execute({ userId, movieId, score }: IRequest): Promise<Rating> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isUser = user.roles.some(role => role.name === 'user');

    if (!isUser) {
      throw new AppError('Only users can create movies', 403);
    }

    const movie = await this.moviesRepository.findById(movieId);

    if (!movie) {
      throw new AppError('Movie not found', 404);
    }

    const ratingExists = await this.ratingsRepository.findByUserAndMovie(
      userId,
      movieId,
    );

    if (ratingExists) {
      throw new AppError('User already rated this movie', 400);
    }

    const rating = await this.ratingsRepository.create({
      userId,
      movieId,
      score,
    });

    return rating;
  }
}

export default CreateMovieService;
