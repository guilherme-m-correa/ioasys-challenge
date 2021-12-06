import { getRepository, Repository } from 'typeorm';
import Director from '@entities/Director';
import IDirectorsRepository from '@contracts/IDirectorsRepository';

class DirectorsRepository implements IDirectorsRepository {
  private ormRepository: Repository<Director>;

  constructor() {
    this.ormRepository = getRepository(Director);
  }

  findById(id: string): Promise<Director | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }
}

export default DirectorsRepository;
