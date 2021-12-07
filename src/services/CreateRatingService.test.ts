import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import IUsersRepository from '@contracts/IUsersRepository';
import IMoviesRepository from '@contracts/IMoviesRepository';
import IRatingsRepository from '@contracts/IRatingsRepository';
import CreateRatingService from '@services/CreateRatingService';
import AppError from '@errors/AppError';

let usersRepository: IUsersRepository;
let moviesRepository: IMoviesRepository;
let ratingsRepository: IRatingsRepository;
let createRatingService: CreateRatingService;

describe('CreateRatingService', () => {
  beforeEach(() => {
    usersRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      update: jest.fn(),
    };

    moviesRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByName: jest.fn(),
      update: jest.fn(),
    };

    ratingsRepository = {
      findByUserAndMovie: jest.fn(),
      create: jest.fn(),
    };

    createRatingService = new CreateRatingService(
      usersRepository,
      moviesRepository,
      ratingsRepository,
    );
  });

  it('should be able to create a new rating', async () => {
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

    const expected = {
      id: '1',
      movieId: movie.id,
      userId: user.id,
      score: 4,
      createdAt: now,
      updatedAt: now,
    };

    const requestData = {
      movieId: movie.id,
      userId: user.id,
      score: 4,
    };

    jest.spyOn(usersRepository, 'findById').mockResolvedValue(user);
    jest.spyOn(moviesRepository, 'findById').mockResolvedValue(movie);
    jest
      .spyOn(ratingsRepository, 'findByUserAndMovie')
      .mockResolvedValue(undefined);
    jest.spyOn(ratingsRepository, 'create').mockResolvedValue(expected);

    const result = await createRatingService.execute(requestData);

    expect(result).toEqual(expected);
  });

  it('should not be able to create a new rating if user is admin', async () => {
    const now = new Date();

    const role = {
      id: '1',
      name: 'admin',
      description: 'Admin',
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
      movieId: movie.id,
      userId: user.id,
      score: 4,
    };

    jest.spyOn(usersRepository, 'findById').mockResolvedValue(user);
    jest.spyOn(moviesRepository, 'findById').mockResolvedValue(movie);
    jest
      .spyOn(ratingsRepository, 'findByUserAndMovie')
      .mockResolvedValue(undefined);

    const result = createRatingService.execute(requestData);

    await expect(result).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rating if user does not exists', async () => {
    const now = new Date();

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
      movieId: movie.id,
      userId: 'non-existing-user-id',
      score: 4,
    };

    jest.spyOn(moviesRepository, 'findById').mockResolvedValue(movie);
    jest
      .spyOn(ratingsRepository, 'findByUserAndMovie')
      .mockResolvedValue(undefined);

    const result = createRatingService.execute(requestData);

    await expect(result).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rating if movie does not exists', async () => {
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
      movieId: 'non-existing-movie-id',
      userId: user.id,
      score: 4,
    };

    jest.spyOn(usersRepository, 'findById').mockResolvedValue(user);
    jest
      .spyOn(ratingsRepository, 'findByUserAndMovie')
      .mockResolvedValue(undefined);

    const result = createRatingService.execute(requestData);

    await expect(result).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to rate the same movie twice with same user', async () => {
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

    const rating = {
      id: '1',
      movieId: movie.id,
      userId: user.id,
      score: 4,
      createdAt: now,
      updatedAt: now,
    };

    const requestData = {
      movieId: movie.id,
      userId: user.id,
      score: 4,
    };

    jest.spyOn(usersRepository, 'findById').mockResolvedValue(user);
    jest.spyOn(moviesRepository, 'findById').mockResolvedValue(movie);
    jest
      .spyOn(ratingsRepository, 'findByUserAndMovie')
      .mockResolvedValue(rating);

    const result = createRatingService.execute(requestData);

    await expect(result).rejects.toBeInstanceOf(AppError);
  });
});
