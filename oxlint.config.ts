import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["react", "typescript"],
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  ignorePatterns: ["dist"],
  settings: {
    react: { version: "19" },
  },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    // Matches the old ESLint setup, which never had this rule.
    "react/refs": "off",
  },
});
