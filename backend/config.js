import dotenv from 'dotenv';

dotenv.config();

export default{
    // this is the value that is written in the .env file
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
};