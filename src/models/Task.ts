import { db } from '../database';
import { Task } from '../types';

export const TaskModel = {
  async findById(id: string): Promise<Task | undefined> {
    return db('tasks').where({ id }).first();
  },

  async findByUserId(userId: string): Promise<Task[]> {
    return db('tasks').where({ userId }).orderBy('createdAt', 'desc');
  },

  async create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const ids = await db('tasks').insert({
      ...task,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const id = Array.isArray(ids) ? ids[0] : ids;
    return (await this.findById(String(id)))!;
  },

  async update(id: string, data: Partial<Task>): Promise<Task> {
    await db('tasks').where({ id }).update({
      ...data,
      updatedAt: new Date(),
    });
    return (await this.findById(id))!;
  },

  async delete(id: string): Promise<void> {
    await db('tasks').where({ id }).delete();
  },

  async findByUserIdAndStatus(userId: string, status: string): Promise<Task[]> {
    return db('tasks').where({ userId, status }).orderBy('dueDate', 'asc');
  },
};
