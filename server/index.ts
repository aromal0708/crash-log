//Express js enry point to test the error logging
import dotenv from "dotenv";
dotenv.config(); // Configure dotenv before other imports

//import necessary modules
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { connectDB } from "./utils/dbConnect";

const app = express();
app.use(express.json());
connectDB();
const port = process.env.PORT || 5000;


app.get("/test-error", (req, res) => {
  throw new Error("I don't care about this error");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

app.use("/auth",authRoutes);