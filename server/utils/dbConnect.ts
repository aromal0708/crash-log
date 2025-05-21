import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("No DB URI found in the env file");
}

export const connectDB = async()=>{
    try{
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected");
    }catch(error){
        if(error instanceof Error){

            console.error("Error connecting to MongoDB:", error.message);   
        }else{
            console.error("Error connecting to MongoDB:", error);
        }
    }
}