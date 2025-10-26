import { Response } from 'express';
import { AuthService } from '../services/AuthService';
import { asyncHandler } from '../middleware/errorHandler';
import { CreateUserRequest, LoginRequest } from '../types';
import { AuthenticatedRequest } from '../middleware/auth';

export const AuthController = {
  register: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const data: CreateUserRequest = req.body;
    const user = await AuthService.register(data);
    res.status(201).json({ success: true, data: user });
  }),

  login: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const data: LoginRequest = req.body;
    const result = await AuthService.login(data);
    res.json({ success: true, data: result });
  }),

  getProfile: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const user = await AuthService.getProfile(req.user!.id);
    res.json({ success: true, data: user });
  }),
};
