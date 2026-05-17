import { Request, Response, NextFunction } from 'express';
import authService from '../services/authService';

export interface AuthRequest extends Request {
  userId?: string;
  token?: string;
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Missing authorization header' });
    return;
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    res.status(401).json({ error: 'Invalid authorization scheme' });
    return;
  }

  const userId = await authService.verifyAccessToken(token);

  if (!userId) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }

  req.userId = userId;
  req.token = token;
  next();
};

export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const [scheme, token] = authHeader.split(' ');

    if (scheme === 'Bearer' && token) {
      const userId = await authService.verifyAccessToken(token);
      if (userId) {
        req.userId = userId;
        req.token = token;
      }
    }
  }

  next();
};
