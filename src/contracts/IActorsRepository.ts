import Actor from '@entities/Actor';

export default interface IActorsRepository {
  findById(id: string): Promise<Actor | undefined>;
}
