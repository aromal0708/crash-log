//Express js entry point to test the error logging
import dotenv from "dotenv";
dotenv.config(); // Configure dotenv before other imports

//import necessary modules
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { connectDB } from "./utils/dbConnect";
import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/projects.routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to the database
const port = process.env.PORT || 5000;

app.get("/test-error", (req, res) => {
  throw new Error("Test error for logging");
});

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);

app.use(errorHandler);

connectDB();
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
