// src/middleware/authMiddleware.ts]
import { Request } from '../types/custom';
import { Response, NextFunction } from 'express';

import { verifyToken } from '../utils/jwt';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided. Please make sure you are logged in' });
  }

  try {
    const decoded = verifyToken(token) as { userId: number, role: string };
    req.user = { id: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token, please login again' });
  }
};
