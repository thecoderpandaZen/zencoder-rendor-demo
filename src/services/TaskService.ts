import { TaskModel } from '../models/Task';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../types';
import { AppError } from '../middleware/errorHandler';

export const TaskService = {
  async createTask(userId: string, data: CreateTaskRequest): Promise<Task> {
    const task = await TaskModel.create({
      userId,
      title: data.title,
      description: data.description,
      status: 'pending',
      priority: data.priority || 'medium',
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    } as any);
    return task;
  },

  async getTasksByUserId(userId: string): Promise<Task[]> {
    return TaskModel.findByUserId(userId);
  },

  async getTaskById(id: string, userId: string): Promise<Task> {
    const task = await TaskModel.findById(id);
    if (!task || task.userId !== userId) {
      throw new AppError('Task not found', 404);
    }
    return task;
  },

  async updateTask(id: string, userId: string, data: UpdateTaskRequest): Promise<Task> {
    await this.getTaskById(id, userId);
    const updateData: Partial<Task> = {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    } as Partial<Task>;
    return TaskModel.update(id, updateData);
  },

  async deleteTask(id: string, userId: string): Promise<void> {
    await this.getTaskById(id, userId);
    await TaskModel.delete(id);
  },

  async getTasksByStatus(userId: string, status: string): Promise<Task[]> {
    const validStatuses = ['pending', 'in_progress', 'completed'];
    if (!validStatuses.includes(status)) {
      throw new AppError('Invalid status', 400);
    }
    return TaskModel.findByUserIdAndStatus(userId, status);
  },
};
