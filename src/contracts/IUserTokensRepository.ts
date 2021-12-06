import UserToken from '@entities/UserToken';

export default interface IUsersRepository {
  generate(userId: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
