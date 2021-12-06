import { Repository, getRepository } from 'typeorm';

import UserToken from '@entities/UserToken';
import IUserTokensRepository from '@contracts/IUserTokensRepository';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(userId: string): Promise<UserToken> {
    throw new Error('Method not implemented.');
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    throw new Error('Method not implemented.');
  }
}

export default UserTokensRepository;
