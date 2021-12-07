import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import IMoviesRepository from '@contracts/IMoviesRepository';
import ShowMovieService from '@services/ShowMovieService';
import AppError from '@errors/AppError';

jest.mock('jsonwebtoken');

let moviesRepository: IMoviesRepository;
let showMovieService: ShowMovieService;

describe('ListMoviesService', () => {
  beforeEach(() => {
    moviesRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByName: jest.fn(),
      update: jest.fn(),
    };

    showMovieService = new ShowMovieService(moviesRepository);
  });

  it('should be able to show movie details', async () => {
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

    const rating = {
      id: '1',
      movieId: '1',
      userId: '1',
      score: 0,
      createdAt: now,
      updatedAt: now,
    };

    const rating2 = {
      id: '2',
      movieId: '1',
      userId: '2',
      score: 4,
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
      ratings: [rating, rating2],
      createdAt: now,
      updatedAt: now,
    };

    const expected = {
      ...movie,
      averageRating: 2,
    };

    jest.spyOn(moviesRepository, 'findById').mockResolvedValue(movie);

    const result = await showMovieService.execute({ movieId: '1' });

    expect(result).toEqual(expected);
  });

  it('should not be able to show a non existing movie details', async () => {
    const result = showMovieService.execute({
      movieId: 'non-existing-movie-id',
    });

    await expect(result).rejects.toBeInstanceOf(AppError);
  });
});
