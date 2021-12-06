import { getRepository, Repository } from 'typeorm';
import Rating from '@entities/Rating';
import IRatingsRepository from '@contracts/IRatingsRepository';
import ICreateRatingDTO from '@dtos/ICreateRatingDTO';

class RatingsRepository implements IRatingsRepository {
  private ormRepository: Repository<Rating>;

  constructor() {
    this.ormRepository = getRepository(Rating);
  }

  async create(data: ICreateRatingDTO): Promise<Rating> {
    const rating = this.ormRepository.create(data);

    await this.ormRepository.save(rating);

    return rating;
  }

  async findByUserAndMovie(
    userId: string,
    movieId: string,
  ): Promise<Rating | undefined> {
    const rating = await this.ormRepository.findOne({
      where: {
        userId,
        movieId,
      },
    });

    return rating;
  }
}

export default RatingsRepository;
