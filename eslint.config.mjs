// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/.cache/**",
      "**/.local/**",
      "**/.replit-artifact/**",
      "**/*.generated.*",
      "**/generated/**",
      "attached_assets/**",
      "artifacts/mockup-sandbox/**",
      "scripts/**",
      "artifacts/api-server/build.mjs",
      "**/*.config.{js,mjs,ts}",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["artifacts/api-server/src/**/*.ts", "artifacts/web/src/**/*.{ts,tsx}", "lib/*/src/**/*.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
);
