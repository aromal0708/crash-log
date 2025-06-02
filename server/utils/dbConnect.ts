// Description: Database connection utility for MongoDB in the application.'

//Import necessary modules
import mongoose from "mongoose";

// Load environment variables from .env file
const MONGODB_URI = process.env.MONGODB_URI;

// Ensure MONGODB_URI is defined
if (!MONGODB_URI) {
  throw new Error("No DB URI found in the env file");
}


// Function to connect to MongoDB
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