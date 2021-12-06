import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import authConfig from '@config/auth';
import AppError from '@errors/AppError';

type ITokenPayload = {
  iat: number;
  userId: string;
  roles: string[];
};

export default function auth(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      const error = new AppError('JWT token is missing', 401);

      return next(error);
    }

    const [, token] = authHeader.split(' ');

    const decodedToken = verify(token, authConfig.jwt.secret);

    const { userId } = decodedToken as ITokenPayload;

    request.user = {
      id: userId,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}
