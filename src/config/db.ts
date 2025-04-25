import mongoose from "mongoose";
import { config } from "./config";

const connectDb = async () => {
    try {
        await mongoose.connect(config.mongoUri)
        console.log("Mongodb Connected");
    } catch (error) {
        console.error('MongoDB connection failed:', error);
         process.exit(1);
    }
}

export default connectDb;