import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@contracts/IUsersRepository';
import IRolesRepository from '@contracts/IRolesRepository';
import IHashProvider from '@contracts/IHashProvider';
import User from '@entities/User';
import AppError from '@errors/AppError';
import Role from '@entities/Role';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  password: string;
  roles: string[];
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private readonly userRepository: IUsersRepository,
    @inject('RolesRepository')
    private readonly rolesRepository: IRolesRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    userId,
    name,
    email,
    password,
    roles: roleNames,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const roles: Role[] = [];

    for (const roleName of roleNames) {
      const role = await this.rolesRepository.findByName(roleName);

      if (!role) {
        throw new AppError(`Role ${roleName} does not exist`);
      }

      roles.push(role);
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    Object.assign(user, {
      name,
      email,
      password: passwordHash,
      roles,
      isActive: true,
    });

    await this.userRepository.update(user);

    Reflect.deleteProperty(user, 'password');

    return user;
  }
}

export default UpdateUserService;
