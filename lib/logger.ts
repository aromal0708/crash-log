//File to override console.text method and log errors to a file

//Import necessary modules
import fs from "fs-extra";
import path from "path";
import dayjs from "dayjs";
import { ParseError } from "@/types";
import { parseError } from "./parseError";

// Create a logs directory if it doesn't exist
const logDir = path.join(__dirname, "..", "logs");
// Ensure the directory exists
fs.ensureDirSync(logDir);

// Function to write logs to a file
const writeLog = (error: ParseError) => {
  // Create a log message with timestamp and severity
  const logMessage = `[${error.timestamp}] [${error.severity}] ${error.message}\n`;
  const logFileName = dayjs().format("YYYY-MM-DD") + ".txt";
  const logFilePath = path.join(logDir, logFileName);

  // Append the log message to the log file
  fs.appendFileSync(logFilePath, logMessage);
};

// Function to override console.text method
export const overRideConsoleText = () => {
  (console as any).text = (error: Error) => {
    const parsedError: ParseError = parseError(error);
    writeLog(parsedError);
    // console.log("\x1b[36m%s\x1b[0m", text);
  };
};
