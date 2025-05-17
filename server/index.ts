//Express js enry point to test the error logging

//import necessary modules
import express from "express";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/test-error", (req, res) => {
  throw new Error("I don't care about this error");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
