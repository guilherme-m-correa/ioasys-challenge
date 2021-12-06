import Movie from '@entities/Movie';
import ICreateMovieDTO from '@dtos/ICreateMovieDTO';
import IFindMoviesDTO from '@dtos/IFindMoviesDTO';

export default interface IMoviesRepository {
  findAll(data: IFindMoviesDTO): Promise<Movie[]>;
  findById(id: string): Promise<Movie | undefined>;
  findByName(name: string): Promise<Movie | undefined>;
  create(data: ICreateMovieDTO): Promise<Movie>;
  update(movie: Movie): Promise<Movie>;
}
