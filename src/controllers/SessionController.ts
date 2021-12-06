import AuthenticateUserService from '@services/AuthenticateUserService';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionController {
  public async store(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const authenticateUserService = container.resolve(
        AuthenticateUserService,
      );

      const { email, password } = request.body;

      const user = await authenticateUserService.execute({ email, password });

      return response.status(201).json(user);
    } catch (error) {
      return next(error);
    }
  }
}
