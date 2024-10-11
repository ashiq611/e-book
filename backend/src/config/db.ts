import mongoose from "mongoose";
import { config } from "./config";


const connectDB = async () => {
    try{
        mongoose.connection.on('connected', () => {
            console.log("MongoDB connected");
        });

        mongoose.connection.on('error', (err) => {
            console.error("MongoDB connection error", err);
        })

        mongoose.connection.on('disconnected', () => {
            console.log("MongoDB disconnected");
        });

        await mongoose.connect(config.dbUrl as string);
    } catch(err){
        console.error("MongoDB connection failed", err);
        process.exit(1);
    }
}

export default connectDB;