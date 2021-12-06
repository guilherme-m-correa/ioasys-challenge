import { getRepository, Repository } from 'typeorm';
import Actor from '@entities/Actor';
import IActorsRepository from '@contracts/IActorsRepository';

class ActorsRepository implements IActorsRepository {
  private ormRepository: Repository<Actor>;

  constructor() {
    this.ormRepository = getRepository(Actor);
  }

  findById(id: string): Promise<Actor | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }
}

export default ActorsRepository;
