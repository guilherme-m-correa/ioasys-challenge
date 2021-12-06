import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@contracts/IUsersRepository';
import IRolesRepository from '@contracts/IRolesRepository';
import IHashProvider from '@contracts/IHashProvider';
import User from '@entities/User';
import AppError from '@errors/AppError';
import Role from '@entities/Role';

interface IRequest {
  name: string;
  email: string;
  password: string;
  roles: string[];
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private readonly userRepository: IUsersRepository,
    @inject('RolesRepository')
    private readonly rolesRepository: IRolesRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    name,
    email,
    password,
    roles: roleNames,
  }: IRequest): Promise<User> {
    const emailAlreadyTaken = await this.userRepository.findByEmail(email);

    if (emailAlreadyTaken) {
      throw new AppError('Email already taken');
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

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      roles,
      isActive: true,
    });

    Reflect.deleteProperty(user, 'password');

    return user;
  }
}

export default CreateUserService;
