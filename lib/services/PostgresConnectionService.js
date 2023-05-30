import pg from 'pg';
import { logger } from '../logger/Logger.js';

class PostgresConnectionService {
  constructor() {
    this.postgresPool = new pg.Pool({
      host: process.env.POSTGRES_CONNECTION_STRING,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE
    });
  }

  async runQuery(SQL, values) {
    try {
      const result = (await this.postgresPool.query(SQL, values)).rows;
      return result;
    } catch (err) {
      logger.logPostgresError(err);
      throw err;
    }
  }
}

export const postgresConnectionService = new PostgresConnectionService();
