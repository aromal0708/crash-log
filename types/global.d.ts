declare global {
  interface Console {
    text: (error: Error) => void;
  }
}

export {};
