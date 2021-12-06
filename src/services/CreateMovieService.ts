import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@contracts/IUsersRepository';
import AppError from '@errors/AppError';
import Movie from '@entities/Movie';
import IMoviesRepository from '@contracts/IMoviesRepository';
import IDirectorsRepository from '@contracts/IDirectorsRepository';
import IActorsRepository from '@contracts/IActorsRepository';
import IWritersRepository from '@contracts/IWritersRepository';
import IGenresRepository from '@contracts/IGenresRepository';
import Actor from '@entities/Actor';
import Writer from '@entities/Writer';
import Genre from '@entities/Genre';

interface IRequest {
  userId: string;
  name: string;
  duration: number;
  description: string;
  releaseDate: Date;
  directorId: string;
  writersIds: string[];
  actorsIds: string[];
  genresIds: string[];
}

@injectable()
class CreateMovieService {
  constructor(
    @inject('UsersRepository')
    private readonly userRepository: IUsersRepository,
    @inject('MoviesRepository')
    private readonly moviesRepository: IMoviesRepository,
    @inject('DirectorsRepository')
    private readonly directorsRepository: IDirectorsRepository,
    @inject('ActorsRepository')
    private readonly actorsRepository: IActorsRepository,
    @inject('WritersRepository')
    private readonly writersRepository: IWritersRepository,
    @inject('GenresRepository')
    private readonly genresRepository: IGenresRepository,
  ) {}

  async execute({
    userId,
    name,
    description,
    duration,
    releaseDate,
    directorId,
    writersIds,
    actorsIds,
    genresIds,
  }: IRequest): Promise<Movie> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isAdmin = user.roles.some(role => role.name === 'admin');

    if (!isAdmin) {
      throw new AppError('Only admins can create movies', 403);
    }

    const movieNameExists = await this.moviesRepository.findByName(name);

    if (movieNameExists) {
      throw new AppError('Movie name already exists');
    }

    const director = await this.directorsRepository.findById(directorId);

    if (!director) {
      throw new AppError(`Director ${directorId} id does not exists`);
    }

    const actors: Actor[] = [];

    for (const id of actorsIds) {
      const actor = await this.actorsRepository.findById(id);

      if (!actor) {
        throw new AppError(`Actor ${id} id does not exists`);
      }

      actors.push(actor);
    }

    const writers: Writer[] = [];

    for (const id of writersIds) {
      const writer = await this.writersRepository.findById(id);

      if (!writer) {
        throw new AppError(`Writer ${id} id does not exists`);
      }

      writers.push(writer);
    }

    const genres: Genre[] = [];

    for (const id of genresIds) {
      const genre = await this.genresRepository.findById(id);

      if (!genre) {
        throw new AppError(`Genre ${id} id does not exists`);
      }

      genres.push(genre);
    }

    const movie = await this.moviesRepository.create({
      name,
      description,
      duration,
      releaseDate,
      director,
      actors,
      writers,
      genres,
    });

    return movie;
  }
}

export default CreateMovieService;
