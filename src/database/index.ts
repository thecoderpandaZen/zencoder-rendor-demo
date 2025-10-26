import knex from 'knex';
import knexConfig from '../../knexfile';

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

export const db = knex(config);

export async function testConnection(): Promise<boolean> {
  try {
    await db.raw('SELECT 1+1 AS result');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}
