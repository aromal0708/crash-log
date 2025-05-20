//Express js enry point to test the error logging

//import necessary modules
import express from "express";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(express.json());
require("dotenv").config();

const port = process.env.PORT || 5000;

app.get("/test-error", (req, res) => {
  throw new Error("I don't care about this error");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
