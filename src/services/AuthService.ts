import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/User';
import { config } from '../config';
import { User, CreateUserRequest, LoginRequest, JWTPayload } from '../types';
import { AppError } from '../middleware/errorHandler';

export const AuthService = {
  async register(data: CreateUserRequest): Promise<Omit<User, 'password'>> {
    const existingUser = await UserModel.findByEmail(data.email);
    if (existingUser) {
      throw new AppError('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await UserModel.create({
      email: data.email,
      password: hashedPassword,
      name: data.name,
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  async login(data: LoginRequest): Promise<{ user: Omit<User, 'password'>; token: string }> {
    const user = await UserModel.findByEmail(data.email);
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email } as JWTPayload,
      config.jwt.secret as string,
      { expiresIn: config.jwt.expiresIn } as SignOptions
    );

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  },

  async getProfile(userId: string): Promise<Omit<User, 'password'>> {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
};
