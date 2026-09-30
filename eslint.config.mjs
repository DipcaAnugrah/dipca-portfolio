import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import path from "node:path";

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);
const compat = new FlatCompat({ baseDirectory: currentDirectory });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      ".next/**",
      ".codex-temp/**",
      "node_modules/**",
      "node_modules.incomplete-install/**",
      "coffee_tuman_php/**",
      "sistem-kasir/**",
      "Kasatset/**",
      "web legalkes/**",
      "sertifikat/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
