import fs from "fs-extra";
import path from "path";
import dayjs from "dayjs";
import { ParseError } from "@/types";
import { parseError } from "./parseError";

declare global {
  interface Console {
    text(text: string): void;
  }
}

const logDir = path.join(__dirname, "..", "logs");
fs.ensureDirSync(logDir);

const writeLog = (error: ParseError) => {
  const logMessage = `[${error.timestamp}] [${error.severity}] ${error.message}\n`;
  const logFileName = dayjs().format("YYYY-MM-DD") + ".txt";
  const logFilePath = path.join(logDir, logFileName);

  fs.appendFileSync(logFilePath, logMessage);
};

export const overRideConsoleText = () => {
  (console as any).text = (error: Error) => {
    const parsedError: ParseError = parseError(error);
    writeLog(parsedError);
    // console.log("\x1b[36m%s\x1b[0m", text);
  };
};
