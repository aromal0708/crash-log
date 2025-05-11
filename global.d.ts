declare global {
  var console: Console;
  interface Console {
    text(text: string): void;
  }
}

export {};
