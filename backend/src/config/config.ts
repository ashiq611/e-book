import { config as conf } from 'dotenv';
conf();

// Purpose: Configuration file for the backend server.
const _config = {
    port : process.env.PORT,
    dbUrl : process.env.MONGO_URL,


}

export const config = Object.freeze(_config);