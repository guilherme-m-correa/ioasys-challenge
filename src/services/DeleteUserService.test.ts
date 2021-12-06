import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import IUsersRepository from '@contracts/IUsersRepository';
import DeleteUserService from '@services/DeleteUserService';
import AppError from '@errors/AppError';

let userRepository: IUsersRepository;
let deleteUserService: DeleteUserService;

describe('DeleteUserService', () => {
  beforeEach(() => {
    userRepository = {
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    };

    deleteUserService = new DeleteUserService(userRepository);
  });

  it('should be able to logical delete a user', async () => {
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

    const result = await deleteUserService.execute({ userId: user.id });

    const expected = {
      ...user,
      isActive: false,
    };

    expect(result).toEqual(expected);
    expect(result).toHaveProperty('id');
    expect(result).not.toHaveProperty('password');
  });

  it('should not be able to delete a non existing user', async () => {
    const result = deleteUserService.execute({
      userId: 'non-existing-user-id',
    });

    await expect(result).rejects.toBeInstanceOf(AppError);
  });
});
