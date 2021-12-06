import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import IHashProvider from '@contracts/IHashProvider';
import IRolesRepository from '@contracts/IRolesRepository';
import IUsersRepository from '@contracts/IUsersRepository';
import CreateUserService from '@services/CreateUserService';
import AppError from '@errors/AppError';

let userRepository: IUsersRepository;
let rolesRepository: IRolesRepository;
let hashProvider: IHashProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    userRepository = {
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    };

    rolesRepository = {
      findByName: jest.fn(),
    };

    hashProvider = {
      generateHash: jest.fn(),
      compareHash: jest.fn(),
    };

    createUserService = new CreateUserService(
      userRepository,
      rolesRepository,
      hashProvider,
    );
  });

  it('should be defined', () => {
    expect(createUserService).toBeDefined();
  });

  it('should not be able to create a user if email already exists', async () => {
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

    jest.spyOn(rolesRepository, 'findByName').mockResolvedValue(role);

    jest
      .spyOn(hashProvider, 'generateHash')
      .mockResolvedValue('hashed_password');

    jest.spyOn(rolesRepository, 'findByName').mockResolvedValue(role);

    jest.spyOn(userRepository, 'create').mockResolvedValue(user);

    const requestData = {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
      roles: ['user'],
    };

    const result = await createUserService.execute(requestData);

    const expected = user;

    expect(result).toMatchObject(expected);
    expect(result).toHaveProperty('id');
    expect(result).not.toHaveProperty('password');
  });

  it('should be able to create a user containing name, email, password and roles', async () => {
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
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
      roles: ['user'],
    };

    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(user);

    const result = createUserService.execute(requestData);

    await expect(result).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a with a non existing role', async () => {
    const requestData = {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
      roles: ['non-existing-role'],
    };

    const result = createUserService.execute(requestData);

    await expect(result).rejects.toBeInstanceOf(AppError);
  });
});
