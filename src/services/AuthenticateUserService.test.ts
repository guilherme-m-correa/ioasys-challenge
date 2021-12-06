import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import IHashProvider from '@contracts/IHashProvider';
import IUsersRepository from '@contracts/IUsersRepository';
import jwt from 'jsonwebtoken';
import AuthenticateUserService from '@services/AuthenticateUserService';
import AppError from '@errors/AppError';

jest.mock('jsonwebtoken');

let userRepository: IUsersRepository;
let hashProvider: IHashProvider;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    userRepository = {
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    };

    hashProvider = {
      generateHash: jest.fn(),
      compareHash: jest.fn(),
    };

    authenticateUserService = new AuthenticateUserService(
      userRepository,
      hashProvider,
    );
  });

  it('should be able to authenticate', async () => {
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

    const token = 'token';

    const expected = {
      user,
      token,
    };

    const sign = jwt.sign as jest.Mock;

    sign.mockReturnValue(token);

    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(user);

    jest.spyOn(hashProvider, 'compareHash').mockResolvedValue(true);

    const result = await authenticateUserService.execute({
      email: 'email',
      password: 'password',
    });

    expect(result).toEqual(expected);
  });

  it('should not be able to authenticate with a non existing email', async () => {
    const result = authenticateUserService.execute({
      email: 'email',
      password: 'password',
    });

    await expect(result).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a invalid password', async () => {
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

    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(user);

    jest.spyOn(hashProvider, 'compareHash').mockResolvedValue(false);

    const result = authenticateUserService.execute({
      email: 'email',
      password: 'password',
    });

    await expect(result).rejects.toBeInstanceOf(AppError);
  });
});
