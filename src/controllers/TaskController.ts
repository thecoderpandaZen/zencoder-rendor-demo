import { Response } from 'express';
import { TaskService } from '../services/TaskService';
import { asyncHandler } from '../middleware/errorHandler';
import { CreateTaskRequest, UpdateTaskRequest } from '../types';
import { AuthenticatedRequest } from '../middleware/auth';

export const TaskController = {
  createTask: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const data: CreateTaskRequest = req.body;
    const task = await TaskService.createTask(req.user!.id, data);
    res.status(201).json({ success: true, data: task });
  }),

  getTasks: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const tasks = await TaskService.getTasksByUserId(req.user!.id);
    res.json({ success: true, data: tasks });
  }),

  getTask: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const task = await TaskService.getTaskById(req.params.id, req.user!.id);
    res.json({ success: true, data: task });
  }),

  updateTask: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const data: UpdateTaskRequest = req.body;
    const task = await TaskService.updateTask(req.params.id, req.user!.id, data);
    res.json({ success: true, data: task });
  }),

  deleteTask: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    await TaskService.deleteTask(req.params.id, req.user!.id);
    res.json({ success: true, message: 'Task deleted' });
  }),

  getTasksByStatus: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { status } = req.query;
    const tasks = await TaskService.getTasksByStatus(req.user!.id, status as string);
    res.json({ success: true, data: tasks });
  }),
};
