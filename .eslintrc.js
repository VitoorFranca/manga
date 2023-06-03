// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "eslint-plugin-node", "eslint-plugin-import-helpers"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "import-helpers/order-imports": [
      "error",
      {
        newlinesBetween: "always",
        alphabetize: {
          order: "asc",
          ignoreCase: true,
        },
        groups: [
          "module",
          [
            "/^app/",
            "/^delivery/",
            "/^domain/",
            "/^driver/",
            "/^repository/",
            "/^service/",
            "/^usecase/",
          ],
          [("parent", "sibling", "index")],
        ],
      },
    ],
    "node/no-process-env": "error",
  },
  ignorePatterns: [".eslintrs.js"],
};
