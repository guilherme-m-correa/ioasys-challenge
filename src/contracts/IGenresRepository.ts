import Genre from '@entities/Genre';

export default interface IGenresRepository {
  findById(id: string): Promise<Genre | undefined>;
}
