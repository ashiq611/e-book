import { config as conf } from 'dotenv';
conf();

// Purpose: Configuration file for the backend server.
const _config = {
    port : process.env.PORT,
    dbUrl : process.env.MONGO_URL,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudApiKey: process.env.CLOUDINARY_API_KEY,
    cloudApiSecret: process.env.CLOUDINARY_API_SECRET,
    frontendUrl: process.env.FRONTEND_URL


}

export const config = Object.freeze(_config);