import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@contracts/IUsersRepository';
import User from '@entities/User';
import AppError from '@errors/AppError';

interface IRequest {
  userId: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private readonly userRepository: IUsersRepository,
  ) {}

  async execute({ userId }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    Object.assign(user, {
      isActive: false,
    });

    await this.userRepository.update(user);

    Reflect.deleteProperty(user, 'password');

    return user;
  }
}

export default DeleteUserService;
