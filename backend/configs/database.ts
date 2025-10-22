import mongoose from "mongoose";

export const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL as string);
        console.log("MongoDB Connected Successfully!");
    } 
    catch (error) {
        console.error("MongoDB Connection Failed!");
        process.exit(1);
    }
};
