export type ErrorSeverity = "error" | "fatal" | "warn" | "info";

export interface ParseError {
  message: string;
  stack?: string;
  file: string | undefined;
  severity: ErrorSeverity;
  timestamp: string;
}
