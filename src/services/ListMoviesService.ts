import { injectable, inject } from 'tsyringe';
import Movie from '@entities/Movie';
import IMoviesRepository from '@contracts/IMoviesRepository';

interface IRequest {
  name?: string;
  director?: string;
  writer?: string;
  actor?: string;
  genre?: string;
}

@injectable()
class ListMoviesService {
  constructor(
    @inject('MoviesRepository')
    private readonly moviesRepository: IMoviesRepository,
  ) {}

  async execute({
    name,
    actor,
    director,
    genre,
    writer,
  }: IRequest): Promise<Movie[]> {
    const movies = await this.moviesRepository.findAll({
      name,
      actor,
      director,
      genre,
      writer,
    });

    return movies;
  }
}

export default ListMoviesService;
