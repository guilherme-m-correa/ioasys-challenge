import { getRepository, Repository } from 'typeorm';
import Role from '@entities/Role';
import IRolesRepository from '@contracts/IRolesRepository';

class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  findByName(name: string): Promise<Role | undefined> {
    return this.ormRepository.findOne({ where: { name } });
  }
}

export default RolesRepository;
