import knex from 'knex';
import { config as appConfig } from '../config';

const knexConfigs: any = {
  development: {
    client: 'postgresql',
    connection: {
      host: appConfig.database.host,
      port: appConfig.database.port,
      database: appConfig.database.name,
      user: appConfig.database.user,
      password: appConfig.database.password,
    },
    migrations: {
      directory: './dist/database/migrations',
      extension: 'js',
    },
  },
  production: {
    client: 'postgresql',
    connection: appConfig.database.url,
    migrations: {
      directory: './dist/database/migrations',
      extension: 'js',
    },
  },
};

const environment = process.env.NODE_ENV || 'development';
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
