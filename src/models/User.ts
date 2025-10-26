import { db } from '../database';
import { User } from '../types';

export const UserModel = {
  async findById(id: string): Promise<User | undefined> {
    return db('users').where({ id }).first();
  },

  async findByEmail(email: string): Promise<User | undefined> {
    return db('users').where({ email }).first();
  },

  async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const ids = await db('users').insert({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const id = Array.isArray(ids) ? ids[0] : ids;
    return (await this.findById(String(id)))!;
  },

  async update(id: string, data: Partial<User>): Promise<User> {
    await db('users').where({ id }).update({
      ...data,
      updatedAt: new Date(),
    });
    return (await this.findById(id))!;
  },

  async delete(id: string): Promise<void> {
    await db('users').where({ id }).delete();
  },

  async all(): Promise<User[]> {
    return db('users');
  },
};
