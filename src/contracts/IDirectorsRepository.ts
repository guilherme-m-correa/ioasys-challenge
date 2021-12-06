import Director from '@entities/Director';

export default interface IDirectorsRepository {
  findById(id: string): Promise<Director | undefined>;
}
