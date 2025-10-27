import knex from 'knex';

const environment = process.env.NODE_ENV || 'development';

const getConnectionConfig = () => {
  const connectionString = environment === 'production' ? process.env.DATABASE_URL : (process.env.DATABASE_URL_DEV || process.env.DATABASE_URL);
  return {
    connectionString,
    ssl: { rejectUnauthorized: false },
  };
};

const knexConfigs: any = {
  development: {
    client: 'postgresql',
    connection: getConnectionConfig(),
    migrations: {
      directory: './dist/database/migrations',
      extension: 'js',
    },
  },
  production: {
    client: 'postgresql',
    connection: getConnectionConfig(),
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
