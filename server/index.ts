import express from "express";
import { overRideConsoleText } from "@lib/logger";
import { errorHandler } from "@server/middleware/errorHandler";

const app = express();
const port = 3000;

overRideConsoleText();
app.use(express.json());

app.get("/", (req, res) => {
  throw new Error("This is a test error");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server runnign on port ${port}`);
});
