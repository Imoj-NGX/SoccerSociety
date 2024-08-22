import { Request, Response } from 'express';
import  prisma  from '../../prismaClient';
import { hashPassword, comparePassword } from '../../utils/hash';
import { generateToken } from '../../utils/jwt';

export const registerUser = async (req: Request, res: Response) => {
    try {
  const { firstName, lastName, email, password, role } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
});

  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  } 


    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
      },
    });
    const token = generateToken(newUser.id, newUser.role);

    res.status(201).json({message: 'User registered successfully', newUser, token});
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user', details: error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.role);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });
  }
};