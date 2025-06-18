import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#4F46E5", // Indigo
        secondary: "#10B981", // Emerald
        accent: "#F59E0B", // Amber
        muted: "#6B7280", // Gray
        border: "#E5E7EB",
        sidebar: "#F9FAFB",
        "text-primary": "#111827",
        "text-muted": "#6B7280",
      },
      fontFamily: {
        sans: "var(--font-geist-sans)",
        mono: "var(--font-geist-mono)",
      },
    },
  },
};

export default config;
