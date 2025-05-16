export const classifySeverity = (
  error: Error
): "info" | "warn" | "error" | "fatal" => {
  const msg = error.message.toLowerCase();

  if (
    msg.includes("timeout") ||
    msg.includes("connection refused") ||
    msg.includes("out of memory") ||
    msg.includes("unhandled") ||
    msg.includes("fatal")
  ) {
    return "fatal";
  }

  if (
    msg.includes("not found") ||
    msg.includes("undefined") ||
    msg.includes("null") ||
    msg.includes("reference")
  ) {
    return "error";
  }

  if (msg.includes("deprecated") || msg.includes("slow")) {
    return "warn";
  }

  return "info";
};
