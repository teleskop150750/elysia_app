import { antfu } from "@antfu/eslint-config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default antfu(
  {
    stylistics: false,
    ignores: ["tsconfig.json"],
    rules: {
      "antfu/if-newline": "off",
    },
  },
  {
    name: "prettier",
    rules: eslintConfigPrettier.rules,
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/.git/**",
      "**/.hg/**",
      "**/coverage/**",
      "**/build/**",
      "**/public/**",
      "**/vendor/**",
      "**/*.min.*",
      "**/pnpm-lock.yaml",
      "**/yarn.lock",
      "**/package-lock.json",
      "tsconfig.json",
    ],
  },
);
