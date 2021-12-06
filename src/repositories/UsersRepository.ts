import { getRepository, Repository } from 'typeorm';
import User from '@entities/User';
import IUsersRepository from '@contracts/IUsersRepository';
import ICreateUserDTO from '@dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findAll(): Promise<User[]> {
    const users = this.ormRepository.find();

    return users;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: { email },
      relations: ['roles'],
    });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: { id },
      relations: ['roles'],
    });

    return user;
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  async update(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }
}

export default UsersRepository;
