import { container } from 'tsyringe';

import IUsersRepository from '@contracts/IUsersRepository';
import UsersRepository from '@repositories/UsersRepository';

import IRolesRepository from '@contracts/IRolesRepository';
import RolesRepository from '@repositories/RolesRepository';

import IMoviesRepository from '@contracts/IMoviesRepository';
import MoviesRepository from '@repositories/MoviesRepository';

import IDirectorsRepository from '@contracts/IDirectorsRepository';
import DirectorsRepository from '@repositories/DirectorsRepository';

import IActorsRepository from '@contracts/IActorsRepository';
import ActorsRepository from '@repositories/ActorsRepository';

import IWritersRepository from '@contracts/IWritersRepository';
import WritersRepository from '@repositories/WritersRepository';

import IGenresRepository from '@contracts/IGenresRepository';
import GenresRepository from '@repositories/GenresRepository';

import IRatingsRepository from '@contracts/IRatingsRepository';
import RatingsRepository from '@repositories/RatingsRepository';

import IHashProvider from '@contracts/IHashProvider';
import HashProvider from '@providers/HashProvider/BCryptHashProvider';

export default class Container {
  public static registerDependencies(): void {
    container.registerSingleton<IUsersRepository>(
      'UsersRepository',
      UsersRepository,
    );

    container.registerSingleton<IRolesRepository>(
      'RolesRepository',
      RolesRepository,
    );

    container.registerSingleton<IMoviesRepository>(
      'MoviesRepository',
      MoviesRepository,
    );

    container.registerSingleton<IDirectorsRepository>(
      'DirectorsRepository',
      DirectorsRepository,
    );

    container.registerSingleton<IActorsRepository>(
      'ActorsRepository',
      ActorsRepository,
    );

    container.registerSingleton<IWritersRepository>(
      'WritersRepository',
      WritersRepository,
    );

    container.registerSingleton<IGenresRepository>(
      'GenresRepository',
      GenresRepository,
    );

    container.registerSingleton<IRatingsRepository>(
      'RatingsRepository',
      RatingsRepository,
    );

    container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
  }
}
