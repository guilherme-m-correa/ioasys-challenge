import { injectable, inject } from 'tsyringe';
import Movie from '@entities/Movie';
import IMoviesRepository from '@contracts/IMoviesRepository';
import AppError from '@errors/AppError';

interface IRequest {
  movieId: string;
}

type MovieWithAverageRating = Movie & { averageRating: number };

@injectable()
class ShowMovieService {
  constructor(
    @inject('MoviesRepository')
    private readonly moviesRepository: IMoviesRepository,
  ) {}

  async execute({ movieId }: IRequest): Promise<MovieWithAverageRating> {
    const movie = await this.moviesRepository.findById(movieId);

    if (!movie) {
      throw new AppError('Movie not found', 404);
    }

    const ratingSum = movie.ratings.reduce(
      (sum, rating) => sum + rating.score,
      0,
    );

    const averageRating = ratingSum / movie.ratings.length;

    return { ...movie, averageRating };
  }
}

export default ShowMovieService;
