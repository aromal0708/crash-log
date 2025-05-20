# Crash Log

A TypeScript-based error logging system for Express applications that provides structured error logging with severity classification and file tracking.

## Features

- Structured error logging with timestamps and severity levels
- Custom console extension for error logging (`console.text`)
- Automatic file name extraction from error stacks
- Error severity classification
- Daily log file rotation
- Express middleware for error handling
- TypeScript support with proper type definitions

## Project Structure

```
.
├── lib/                    # Core library files
│   ├── extractFileName.ts  # File name extraction from error stacks
│   ├── logger.ts          # Main logging functionality
│   ├── parseError.ts      # Error parsing and structuring
│   └── severityClassifier.ts  # Error severity classification
├── server/                 # Express server implementation
│   ├── index.ts           # Server entry point
│   └── middleware/        
│       └── errorHandler.ts # Express error handling middleware
├── types/                  # TypeScript type definitions
│   ├── global.d.ts        # Global type declarations
│   └── index.ts           # Shared type definitions
└── logs/                  # Generated log files (gitignored)
```

## Installation

```powershell
npm install
```

## Usage

### Basic Usage

```typescript
import { overRideConsoleText } from "./lib/logger";

// Initialize the custom console.text function
overRideConsoleText();

// Log an error
console.text(new Error("Something went wrong"));
```

### Express Middleware

```typescript
import { errorHandler } from "./server/middleware/errorHandler";

// Add the error handler middleware
app.use(errorHandler);
```

### Log Output Format

Logs are written to daily files in the `logs` directory with the following format:
```
[YYYY-MM-DD HH:mm:ss] [severity] error message
```

## Types

### ParseError Interface

```typescript
interface ParseError {
  message: string;
  stack?: string;
  file: string | undefined;
  severity: ErrorSeverity;
  timestamp: string;
}
```

### Error Severity Levels

- error
- fatal
- warn
- info

## Development

The project uses TypeScript and includes proper type definitions. The configuration is set up in `tsconfig.json` with paths aliasing for convenient imports.

### Building

```powershell
npm run build
```

### Development Mode

```powershell
npm run dev
```

## License

MIT