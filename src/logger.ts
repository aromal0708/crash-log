import fs from "fs-extra";
import path from "path";
import dayjs from "dayjs";

declare global {
  interface Console {
    text(text: string): void;
  }
}

const logDir = path.join(__dirname, "..", "logs");
fs.ensureDirSync(logDir);

const writeLog = (message: string) => {
  const timestamp = dayjs().format("YYYY-MM-DD HH:mm:ss");
  const logMessage = `[${timestamp}] ${message}\n`;
  const logFileName = dayjs().format("YYYY-MM-DD") + ".txt";
  const logFilePath = path.join(logDir, logFileName);

  fs.appendFileSync(logFilePath, logMessage);
};

export const overRideConsoleText = () => {
  (console as any).text = (text: string) => {
    writeLog(text);
    console.log("\x1b[36m%s\x1b[0m", text);
  };
};
