import Writer from '@entities/Writer';

export default interface IWritersRepository {
  findById(id: string): Promise<Writer | undefined>;
}
