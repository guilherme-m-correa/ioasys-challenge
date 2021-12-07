import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import IHashProvider from '@contracts/IHashProvider';
import IRolesRepository from '@contracts/IRolesRepository';
import IUsersRepository from '@contracts/IUsersRepository';
import UpdateUserService from '@services/UpdateUserService';
import AppError from '@errors/AppError';

let userRepository: IUsersRepository;
let rolesRepository: IRolesRepository;
let hashProvider: IHashProvider;
let updateUserService: UpdateUserService;

describe('UpdateUserService', () => {
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

    updateUserService = new UpdateUserService(
      userRepository,
      rolesRepository,
      hashProvider,
    );
  });

  it('should be defined', () => {
    expect(updateUserService).toBeDefined();
  });

  it('should be able to update a user', async () => {
    const now = new Date();

    const role = {
      id: '1',
      name: 'admin',
      description: 'Administrator',
      createdAt: now,
      updatedAt: now,
    };

    const role2 = {
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

    jest.spyOn(rolesRepository, 'findByName').mockResolvedValue(role);

    jest
      .spyOn(hashProvider, 'generateHash')
      .mockResolvedValue('hashed_password');

    const requestData = {
      userId: user.id,
      name: 'Updated',
      email: 'updated@gmail.com',
      password: 'updated_password',
      roles: [role2.name],
    };

    const mockUser = {
      id: '1',
      name: requestData.name,
      email: requestData.email,
      password: requestData.password,
      isActive: true,
      roles: [role2],
      createdAt: now,
      updatedAt: now,
    };

    jest.spyOn(rolesRepository, 'findByName').mockResolvedValue(role2);

    jest.spyOn(userRepository, 'findById').mockResolvedValue(user);

    jest.spyOn(userRepository, 'update').mockResolvedValue(mockUser);

    const result = await updateUserService.execute(requestData);

    const expected = {
      id: '1',
      name: requestData.name,
      email: requestData.email,
      isActive: true,
      roles: [role2],
      createdAt: now,
      updatedAt: now,
    };

    expect(result).toMatchObject(expected);

    expect(result).not.toHaveProperty('password');
  });

  it('should not be able to update a non existing user', async () => {
    const requestData = {
      userId: 'non-existing-user-id',
      name: 'Updated',
      email: 'updated@gmail.com',
      password: 'updated_password',
      roles: [],
    };

    const result = updateUserService.execute(requestData);

    await expect(result).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a user providing a non existing role', async () => {
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

    jest.spyOn(userRepository, 'findById').mockResolvedValue(user);

    const requestData = {
      userId: user.id,
      name: 'Updated',
      email: 'updated@gmail.com',
      password: 'updated_password',
      roles: ['non-existing-role'],
    };

    const result = updateUserService.execute(requestData);

    await expect(result).rejects.toBeInstanceOf(AppError);
  });
});
