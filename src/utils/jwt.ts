import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'soccer-secret';

export const generateToken = (userId: number, role: string): string => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
