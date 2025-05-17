//Global type definitions for the project

declare global {
  interface Console {
    text: (error: Error) => void;
  }
}

export {};
