import dotenv from 'dotenv';
import logger from './logger.js';

dotenv.config();

const env = {
    PORT: process.env.PORT ?? 3000,
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    AUTH_TOKEN: process.env.AUTH_TOKEN,
};

if (!env.AUTH_TOKEN) {
    const error = new Error('Failed to parse Authorization Token from environment');
    logger.error('A Authorization Token is required', error);

    throw error;
}

export default env;

