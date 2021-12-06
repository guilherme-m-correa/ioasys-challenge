import User from '@entities/User';
import ICreateUserDTO from '@dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  update(user: User): Promise<User>;
}
