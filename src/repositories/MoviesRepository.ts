import { getRepository, Repository } from 'typeorm';
import Movie from '@entities/Movie';
import IMoviesRepository from '@contracts/IMoviesRepository';
import ICreateMovieDTO from '@dtos/ICreateMovieDTO';
import IFindMoviesDTO from '@dtos/IFindMoviesDTO';

class MoviesRepository implements IMoviesRepository {
  private ormRepository: Repository<Movie>;

  constructor() {
    this.ormRepository = getRepository(Movie);
  }

  async findAll({
    name,
    director,
    actor,
    genre,
    writer,
  }: IFindMoviesDTO): Promise<Movie[]> {
    const query = this.ormRepository
      .createQueryBuilder('movies')
      .leftJoinAndSelect('movies.director', 'director')
      .leftJoinAndSelect('movies.actors', 'actors')
      .leftJoinAndSelect('movies.writers', 'writers')
      .leftJoinAndSelect('movies.genres', 'genres');

    if (name) {
      query.andWhere('movies.name ILIKE :name', { name: `%${name}%` });
    }

    if (director) {
      query.andWhere('director.name ILIKE :director', {
        director: `%${director}%`,
      });
    }

    if (actor) {
      query.andWhere('actors.name ILIKE :actor', {
        actor: `%${actor}%`,
      });
    }

    if (genre) {
      query.andWhere('genres.name LIKE :genre', {
        genre: `%${genre}%`,
      });
    }

    if (writer) {
      query.andWhere('writers.name ILIKE :writer', {
        writer: `%${writer}%`,
      });
    }

    const movies = await query.getMany();

    return movies;
  }

  async findById(id: string): Promise<Movie | undefined> {
    const movie = await this.ormRepository.findOne({
      where: { id },
      relations: ['director', 'actors', 'genres', 'writers', 'ratings'],
    });

    return movie;
  }

  async findByName(name: string): Promise<Movie | undefined> {
    const movie = await this.ormRepository.findOne({
      where: { name },
    });

    return movie;
  }

  async create(data: ICreateMovieDTO): Promise<Movie> {
    const movie = this.ormRepository.create(data);

    await this.ormRepository.save(movie);

    return movie;
  }

  async update(movie: Movie): Promise<Movie> {
    this.ormRepository.save(movie);

    return movie;
  }
}

export default MoviesRepository;
