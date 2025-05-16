import path from "path";

 export const extractFileName = (stack?: string): string | undefined => {
  if (!stack) return undefined;

  const lines = stack.split("\n");

  for (const line of lines) {
    const match = line.match(/\(([^)]+)\)/);
    if (match) {
      const filePath = match[1];
      const fileNameParts = filePath.split(path.sep);
      return fileNameParts.slice(-1)[0];
    }
  }
  return undefined;
};
