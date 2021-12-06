import { NextFunction, Request, Response } from 'express';
import CreateUserService from '@services/CreateUserService';
import UpdateUserService from '@services/UpdateUserService';
import DeleteUserService from '@services/DeleteUserService';
import { container } from 'tsyringe';

export default class UsersController {
  public async store(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const createUserService = container.resolve(CreateUserService);

      const { email, name, password, roles } = request.body;

      const user = await createUserService.execute({
        email,
        name,
        password,
        roles,
      });

      return response.status(201).json(user);
    } catch (error) {
      return next(error);
    }
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const updateUserService = container.resolve(UpdateUserService);

      const { id: userId } = request.params;

      const { email, name, password, roles } = request.body;

      const user = await updateUserService.execute({
        userId,
        email,
        name,
        password,
        roles,
      });

      return response.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const deleteUserService = container.resolve(DeleteUserService);

      const { id: userId } = request.params;

      const user = await deleteUserService.execute({
        userId,
      });

      return response.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }
}
