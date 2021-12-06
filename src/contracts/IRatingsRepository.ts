import Rating from '@entities/Rating';
import ICreateRatingDTO from '@dtos/ICreateRatingDTO';

export default interface IRatingsRepository {
  create(data: ICreateRatingDTO): Promise<Rating>;

  findByUserAndMovie(
    userId: string,
    movieId: string,
  ): Promise<Rating | undefined>;
}
