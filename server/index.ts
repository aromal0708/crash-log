//Express js entry point to test the error logging

// configure dotenv to load environment variables
import dotenv from "dotenv";
dotenv.config(); // Configure dotenv before other imports

//import necessary modules
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { connectDB } from "./utils/dbConnect";
import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/projects.routes";
import errorRoutes from "./routes/error.routes";
import morgan from "morgan";
import cookieParser from "cookie-parser";


// Create an Express application
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

//Define the port
const port = process.env.PORT || 5000;

// Test route to trigger an error for logging
app.get("/test-error", (req, res) => {
  throw new Error("Test error for logging");
});

//Define actual routes for the application
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/error",errorRoutes)


app.use(errorHandler);

// Connect to the database and start the server
connectDB();
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
