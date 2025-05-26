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
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

//connect to the database
const port = process.env.PORT || 5000;

app.get("/test-error", (req, res) => {
  throw new Error("Test error for logging");
});

//Define routes
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);

app.use(errorHandler);

connectDB();
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
