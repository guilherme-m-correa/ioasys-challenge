import 'reflect-metadata';
import { randomUUID as uuid } from 'crypto';
import { getRepository, createConnection, getConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import Role from '@entities/Role';
import Actor from '@entities/Actor';
import faker from 'faker';
import Writer from '@entities/Writer';
import Director from '@entities/Director';
import Genre from '@entities/Genre';

(async () => {
  const connectionOptions = await getConnectionOptions();

  Object.assign(connectionOptions, {
    namingStrategy: new SnakeNamingStrategy(),
  });

  await createConnection();

  const rolesRepository = getRepository(Role);

  const roles = [
    {
      id: uuid(),
      name: 'admin',
      description: 'Administrator',
    },
    {
      id: uuid(),
      name: 'user',
      description: 'User',
    },
  ];

  await rolesRepository.save(roles);

  const actorsRepository = getRepository(Actor);

  const actors = Array.from({ length: 10 }).map(() => ({
    id: uuid(),
    name: faker.name.findName(),
  }));

  await actorsRepository.save(actors);

  const writersRepository = getRepository(Writer);

  const writers = Array.from({ length: 10 }).map(() => ({
    id: uuid(),
    name: faker.name.findName(),
  }));

  await writersRepository.save(writers);

  const directorsRepository = getRepository(Director);

  const directors = Array.from({ length: 10 }).map(() => ({
    id: uuid(),
    name: faker.name.findName(),
  }));

  await directorsRepository.save(directors);

  const genresRepository = getRepository(Genre);

  const genres = [
    {
      id: uuid(),
      name: 'Action',
    },
    {
      id: uuid(),
      name: 'Comedy',
    },
    {
      id: uuid(),
      name: 'Drama',
    },
    {
      id: uuid(),
      name: 'Fantasy',
    },
    {
      id: uuid(),
      name: 'Horror',
    },
    {
      id: uuid(),
      name: 'Mystery',
    },
    {
      id: uuid(),
      name: 'Romance',
    },
    {
      id: uuid(),
      name: 'Thriller',
    },
  ];

  await genresRepository.save(genres);
})();
