import { getRepository, Repository } from 'typeorm';
import Writer from '@entities/Writer';
import IWritersRepository from '@contracts/IWritersRepository';

class WritersRepository implements IWritersRepository {
  private ormRepository: Repository<Writer>;

  constructor() {
    this.ormRepository = getRepository(Writer);
  }

  findById(id: string): Promise<Writer | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }
}

export default WritersRepository;
