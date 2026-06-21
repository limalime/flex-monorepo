import { config as reactConfig } from "@repo/eslint-config/react-internal";

export default [
  ...reactConfig,
  {
    ignores: [".expo/**", "dist/**", "node_modules/**"],
  },
];
