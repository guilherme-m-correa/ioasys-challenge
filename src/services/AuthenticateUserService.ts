import { inject, injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth';
import User from '@entities/User';
import IUsersRepository from '@contracts/IUsersRepository';
import IHashProvider from '@contracts/IHashProvider';
import AppError from '@errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid email', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect password', 401);
    }

    const token = jwt.sign(
      {
        userId: user.id,
        roles: user.roles.map(role => role.name),
      },
      authConfig.jwt.secret,
    );

    Reflect.deleteProperty(user, 'password');

    return { user, token };
  }
}

export default AuthenticateUserService;
