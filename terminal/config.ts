import convict from 'convict';
import { configDotenv } from 'dotenv';
import * as path from 'path';

configDotenv({
  path: path.join(__dirname, '..', '.env.local'),
});

const configObj = convict({
  openAi: {},
  db: {
    host: {
      env: 'DB_HOST',
      default: '',
      format: String,
    },
    port: {
      env: 'DB_PORT',
      default: 5432,
      format: 'port',
    },
    username: {
      env: 'DB_USERNAME',
      default: '',
      format: String,
    },
    password: {
      env: 'DB_PASSWORD',
      default: '',
      format: String,
    },
    database: {
      env: 'DB_DATABASE',
      default: '',
      format: String,
    },
  },
});

export const config = configObj.getProperties();
