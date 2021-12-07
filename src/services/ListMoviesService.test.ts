import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import IMoviesRepository from '@contracts/IMoviesRepository';
import ListMoviesService from '@services/ListMoviesService';

jest.mock('jsonwebtoken');

let moviesRepository: IMoviesRepository;
let listMoviesService: ListMoviesService;

describe('ListMoviesService', () => {
  beforeEach(() => {
    moviesRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByName: jest.fn(),
      update: jest.fn(),
    };

    listMoviesService = new ListMoviesService(moviesRepository);
  });

  it('should be able to list movies', async () => {
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

    const expected = [
      {
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
      },
    ];

    jest.spyOn(moviesRepository, 'findAll').mockResolvedValue(expected);

    const result = await listMoviesService.execute({});

    expect(result).toEqual(expected);
  });
});
