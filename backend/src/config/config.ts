import { config as conf } from 'dotenv';
conf();

// Purpose: Configuration file for the backend server.
const _config = {
    port : process.env.PORT,
    dbUrl : process.env.MONGO_URL,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,


}

export const config = Object.freeze(_config);