/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    semi: ["error", "never"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
  },
};
