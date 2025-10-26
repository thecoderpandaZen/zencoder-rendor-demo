import knex from 'knex';
import { config as appConfig } from '../config';

const environment = process.env.NODE_ENV || 'development';

const connectionConfig = environment === 'production' 
  ? process.env.DATABASE_URL || appConfig.database.url
  : process.env.DATABASE_URL_DEV || process.env.DATABASE_URL || appConfig.database.url;

const knexConfigs: any = {
  development: {
    client: 'postgresql',
    connection: connectionConfig,
    migrations: {
      directory: './dist/database/migrations',
      extension: 'js',
    },
  },
  production: {
    client: 'postgresql',
    connection: connectionConfig,
    migrations: {
      directory: './dist/database/migrations',
      extension: 'js',
    },
  },
};

const knexConfig = knexConfigs[environment];

export const db = knex(knexConfig);

export async function testConnection(): Promise<boolean> {
  try {
    await db.raw('SELECT 1+1 AS result');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}
