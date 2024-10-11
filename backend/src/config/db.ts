import mongoose from "mongoose";
import { config } from "./config";


const connectDB = async () => {
    try{
        // connect confirmation messages
        mongoose.connection.on('connected', () => {
            console.log("MongoDB connected");
        });
        
        // connection error messages
        mongoose.connection.on('error', (err) => {
            console.error("MongoDB connection error", err);
        })
        
        // connection disconnect messages
        mongoose.connection.on('disconnected', () => {
            console.log("MongoDB disconnected");
        });

        await mongoose.connect(config.dbUrl as string);
    } catch(err){
        console.error("MongoDB connection failed", err);
        // exit process with failure status code 1 to indicate failure
        process.exit(1);
    }
}

export default connectDB;