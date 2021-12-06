import { getRepository, Repository } from 'typeorm';
import Genre from '@entities/Genre';
import IGenresRepository from '@contracts/IGenresRepository';

class GenresRepository implements IGenresRepository {
  private ormRepository: Repository<Genre>;

  constructor() {
    this.ormRepository = getRepository(Genre);
  }

  findById(id: string): Promise<Genre | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }
}

export default GenresRepository;
