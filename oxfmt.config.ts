import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 80,
  ignorePatterns: ["dist", "pnpm-lock.yaml"],
  sortImports: {
    groups: [
      "side_effect",
      ["builtin", "external", "internal", "subpath"],
      "parent",
      ["sibling", "index"],
      "style",
      "unknown",
    ],
    ignoreCase: true,
    order: "asc",
  },
});
