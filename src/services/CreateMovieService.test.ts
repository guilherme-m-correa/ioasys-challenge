import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import IUsersRepository from '@contracts/IUsersRepository';
import CreateMovieService from '@services/CreateMovieService';
import IMoviesRepository from '@contracts/IMoviesRepository';
import IDirectorsRepository from '@contracts/IDirectorsRepository';
import IActorsRepository from '@contracts/IActorsRepository';
import IWritersRepository from '@contracts/IWritersRepository';
import IGenresRepository from '@contracts/IGenresRepository';
import AppError from '@errors/AppError';

jest.mock('jsonwebtoken');

let userRepository: IUsersRepository;
let moviesRepository: IMoviesRepository;
let directorsRepository: IDirectorsRepository;
let actorsRepository: IActorsRepository;
let writersRepository: IWritersRepository;
let genresRepository: IGenresRepository;
let createMovieService: CreateMovieService;

describe('CreateMovieService', () => {
  beforeEach(() => {
    userRepository = {
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    };

    moviesRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByName: jest.fn(),
      update: jest.fn(),
    };

    directorsRepository = {
      findById: jest.fn(),
    };

    actorsRepository = {
      findById: jest.fn(),
    };

    writersRepository = {
      findById: jest.fn(),
    };

    genresRepository = {
      findById: jest.fn(),
    };

    createMovieService = new CreateMovieService(
      userRepository,
      moviesRepository,
      directorsRepository,
      actorsRepository,
      writersRepository,
      genresRepository,
    );
  });

  it('should be able to create a movie', async () => {
    const now = new Date();

    const role = {
      id: '1',
      name: 'admin',
      description: 'Administrator',
      createdAt: now,
      updatedAt: now,
    };

    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'hashed_password',
      isActive: true,
      roles: [role],
      createdAt: now,
      updatedAt: now,
    };

    const director = {
      id: '1',
      name: 'director',
      createdAt: now,
      updatedAt: now,
    };

    const writer = {
      id: '1',
      name: 'writer',
      createdAt: now,
      updatedAt: now,
    };

    const actor = {
      id: '1',
      name: 'actor',
      createdAt: now,
      updatedAt: now,
    };

    const genre = {
      id: '1',
      name: 'genre',
      createdAt: now,
      updatedAt: now,
    };

    const expected = {
      id: '1',
      name: 'movie',
      description: 'description',
      duration: 155,
      releaseDate: now,
      directorId: director.id,
      director,
      actors: [actor],
      writers: [writer],
      genres: [genre],
      ratings: [],
      createdAt: now,
      updatedAt: now,
    };

    const requestData = {
      userId: user.id,
      name: 'movie',
      description: 'description',
      duration: 155,
      releaseDate: now,
      directorId: '1',
      actorsIds: ['1'],
      writersIds: ['1'],
      genresIds: ['1'],
    };

    jest.spyOn(userRepository, 'findById').mockResolvedValue(user);
    jest.spyOn(moviesRepository, 'findByName').mockResolvedValue(undefined);
    jest.spyOn(directorsRepository, 'findById').mockResolvedValue(director);
    jest.spyOn(actorsRepository, 'findById').mockResolvedValue(director);
    jest.spyOn(writersRepository, 'findById').mockResolvedValue(director);
    jest.spyOn(genresRepository, 'findById').mockResolvedValue(director);
    jest.spyOn(moviesRepository, 'create').mockResolvedValue(expected);

    const result = await createMovieService.execute(requestData);

    expect(result).toEqual(expected);
  });

  it('should not be able to create a movie if user does not exists', async () => {
    const now = new Date();

    const role = {
      id: '1',
      name: 'admin',
      description: 'Administrator',
      createdAt: now,
      updatedAt: now,
    };

    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'hashed_password',
      isActive: true,
      roles: [role],
      createdAt: now,
      updatedAt: now,
    };

    const requestData = {
      userId: user.id,
      name: 'movie',
      description: 'description',
      duration: 155,
      releaseDate: now,
      directorId: '1',
      actorsIds: ['1'],
      writersIds: ['1'],
      genresIds: ['1'],
    };

    const result = createMovieService.execute(requestData);

    await expect(result).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a movie if user is not admin', async () => {
    const now = new Date();

    const role = {
      id: '1',
      name: 'user',
      description: 'User',
      createdAt: now,
      updatedAt: now,
    };

    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'hashed_password',
      isActive: true,
      roles: [role],
      createdAt: now,
      updatedAt: now,
    };

    const requestData = {
      userId: user.id,
      name: 'movie',
      description: 'description',
      duration: 155,
      releaseDate: now,
      directorId: '1',
      actorsIds: ['1'],
      writersIds: ['1'],
      genresIds: ['1'],
    };

    jest.spyOn(userRepository, 'findById').mockResolvedValue(user);

    const result = createMovieService.execute(requestData);

    await expect(result).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a movie if provided name already exists', async () => {
    const now = new Date();

    const role = {
      id: '1',
      name: 'admin',
      description: 'Administrator',
      createdAt: now,
      updatedAt: now,
    };

    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'hashed_password',
      isActive: true,
      roles: [role],
      createdAt: now,
      updatedAt: now,
    };

    const director = {
      id: '1',
      name: 'director',
      createdAt: now,
      updatedAt: now,
    };

    const writer = {
      id: '1',
      name: 'writer',
      createdAt: now,
      updatedAt: now,
    };

    const actor = {
      id: '1',
      name: 'actor',
      createdAt: now,
      updatedAt: now,
    };

    const genre = {
      id: '1',
      name: 'genre',
      createdAt: now,
      updatedAt: now,
    };

    const movie = {
      id: '1',
      name: 'movie',
      description: 'description',
      duration: 155,
      releaseDate: now,
      directorId: director.id,
      director,
      actors: [actor],
      writers: [writer],
      genres: [genre],
      ratings: [],
      createdAt: now,
      updatedAt: now,
    };

    const requestData = {
      userId: user.id,
      name: 'movie',
      description: 'description',
      duration: 155,
      releaseDate: now,
      directorId: '1',
      actorsIds: ['1'],
      writersIds: ['1'],
      genresIds: ['1'],
    };

    jest.spyOn(userRepository, 'findById').mockResolvedValue(user);
    jest.spyOn(moviesRepository, 'findByName').mockResolvedValue(movie);

    const result = createMovieService.execute(requestData);

    await expect(result).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a movie if user provided director does not exists', async () => {
    const now = new Date();

    const role = {
      id: '1',
      name: 'admin',
      description: 'Administrator',
      createdAt: now,
      updatedAt: now,
    };

    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'hashed_password',
      isActive: true,
      roles: [role],
      createdAt: now,
      updatedAt: now,
    };

    const director = {
      id: '1',
      name: 'director',
      createdAt: now,
      updatedAt: now,
    };

    const writer = {
      id: '1',
      name: 'writer',
      createdAt: now,
      updatedAt: now,
    };

    const actor = {
      id: '1',
      name: 'actor',
      createdAt: now,
      updatedAt: now,
    };

    const genre = {
      id: '1',
      name: 'genre',
      createdAt: now,
      updatedAt: now,
    };

    const movie = {
      id: '1',
      name: 'movie',
      description: 'description',
      duration: 155,
      releaseDate: now,
      directorId: director.id,
      director,
      actors: [actor],
      writers: [writer],
      genres: [genre],
      ratings: [],
      createdAt: now,
      updatedAt: now,
    };

    const requestData = {
      userId: user.id,
      name: 'movie',
      description: 'description',
      duration: 155,
      releaseDate: now,
      directorId: '1',
      actorsIds: ['1'],
      writersIds: ['1'],
      genresIds: ['1'],
    };

    jest.spyOn(userRepository, 'findById').mockResolvedValue(user);
    jest.spyOn(moviesRepository, 'findById').mockResolvedValue(movie);
    jest.spyOn(actorsRepository, 'findById').mockResolvedValue(actor);
    jest.spyOn(writersRepository, 'findById').mockResolvedValue(writer);
    jest.spyOn(genresRepository, 'findById').mockResolvedValue(genre);
    const result = createMovieService.execute(requestData);

    await expect(result).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a movie if user provided actors does not exists', async () => {
    const now = new Date();

    const role = {
      id: '1',
      name: 'admin',
      description: 'Administrator',
      createdAt: now,
      updatedAt: now,
    };

    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'hashed_password',
      isActive: true,
      roles: [role],
      createdAt: now,
      updatedAt: now,
    };

    const director = {
      id: '1',
      name: 'director',
      createdAt: now,
      updatedAt: now,
    };

    const writer = {
      id: '1',
      name: 'writer',
      createdAt: now,
      updatedAt: now,
    };

    const actor = {
      id: '1',
      name: 'actor',
      createdAt: now,
      updatedAt: now,
    };

    const genre = {
      id: '1',
      name: 'genre',
      createdAt: now,
      updatedAt: now,
    };

    const movie = {
      id: '1',
      name: 'movie',
      description: 'description',
      duration: 155,
      releaseDate: now,
      directorId: director.id,
      director,
      actors: [actor],
      writers: [writer],
      genres: [genre],
      ratings: [],
      createdAt: now,
      updatedAt: now,
    };

    const requestData = {
      userId: user.id,
      name: 'movie',
      description: 'description',
      duration: 155,
      releaseDate: now,
      directorId: '1',
      actorsIds: ['1'],
      writersIds: ['1'],
      genresIds: ['1'],
    };

    jest.spyOn(userRepository, 'findById').mockResolvedValue(user);
    jest.spyOn(moviesRepository, 'findById').mockResolvedValue(movie);
    jest.spyOn(directorsRepository, 'findById').mockResolvedValue(director);
    jest.spyOn(writersRepository, 'findById').mockResolvedValue(writer);
    jest.spyOn(genresRepository, 'findById').mockResolvedValue(genre);
    const result = createMovieService.execute(requestData);

    await expect(result).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a movie if user provided genre does not exists', async () => {
    const now = new Date();

    const role = {
      id: '1',
      name: 'admin',
      description: 'Administrator',
      createdAt: now,
      updatedAt: now,
    };

    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'hashed_password',
      isActive: true,
      roles: [role],
      createdAt: now,
      updatedAt: now,
    };

    const director = {
      id: '1',
      name: 'director',
      createdAt: now,
      updatedAt: now,
    };

    const writer = {
      id: '1',
      name: 'writer',
      createdAt: now,
      updatedAt: now,
    };

    const actor = {
      id: '1',
      name: 'actor',
      createdAt: now,
      updatedAt: now,
    };

    const genre = {
      id: '1',
      name: 'genre',
      createdAt: now,
      updatedAt: now,
    };

    const movie = {
      id: '1',
      name: 'movie',
      description: 'description',
      duration: 155,
      releaseDate: now,
      directorId: director.id,
      director,
      actors: [actor],
      writers: [writer],
      genres: [genre],
      ratings: [],
      createdAt: now,
      updatedAt: now,
    };

    const requestData = {
      userId: user.id,
      name: 'movie',
      description: 'description',
      duration: 155,
      releaseDate: now,
      directorId: '1',
      actorsIds: ['1'],
      writersIds: ['1'],
      genresIds: ['1'],
    };

    jest.spyOn(userRepository, 'findById').mockResolvedValue(user);
    jest.spyOn(moviesRepository, 'findById').mockResolvedValue(movie);
    jest.spyOn(directorsRepository, 'findById').mockResolvedValue(director);
    jest.spyOn(actorsRepository, 'findById').mockResolvedValue(actor);
    jest.spyOn(genresRepository, 'findById').mockResolvedValue(genre);
    const result = createMovieService.execute(requestData);

    await expect(result).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a movie if user provided writer does not exists', async () => {
    const now = new Date();

    const role = {
      id: '1',
      name: 'admin',
      description: 'Administrator',
      createdAt: now,
      updatedAt: now,
    };

    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'hashed_password',
      isActive: true,
      roles: [role],
      createdAt: now,
      updatedAt: now,
    };

    const director = {
      id: '1',
      name: 'director',
      createdAt: now,
      updatedAt: now,
    };

    const writer = {
      id: '1',
      name: 'writer',
      createdAt: now,
      updatedAt: now,
    };

    const actor = {
      id: '1',
      name: 'actor',
      createdAt: now,
      updatedAt: now,
    };

    const genre = {
      id: '1',
      name: 'genre',
      createdAt: now,
      updatedAt: now,
    };

    const movie = {
      id: '1',
      name: 'movie',
      description: 'description',
      duration: 155,
      releaseDate: now,
      directorId: director.id,
      director,
      actors: [actor],
      writers: [writer],
      genres: [genre],
      ratings: [],
      createdAt: now,
      updatedAt: now,
    };

    const requestData = {
      userId: user.id,
      name: 'movie',
      description: 'description',
      duration: 155,
      releaseDate: now,
      directorId: '1',
      actorsIds: ['1'],
      writersIds: ['1'],
      genresIds: ['1'],
    };

    jest.spyOn(userRepository, 'findById').mockResolvedValue(user);
    jest.spyOn(moviesRepository, 'findById').mockResolvedValue(movie);
    jest.spyOn(directorsRepository, 'findById').mockResolvedValue(director);
    jest.spyOn(actorsRepository, 'findById').mockResolvedValue(actor);
    jest.spyOn(writersRepository, 'findById').mockResolvedValue(writer);
    const result = createMovieService.execute(requestData);

    await expect(result).rejects.toBeInstanceOf(AppError);
  });
});
