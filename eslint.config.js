const js = require("@eslint/js");
const globals = require("globals");
const eslintConfigPrettier = require("eslint-config-prettier");

module.exports = [
  js.configs.recommended, // Sử dụng các luật chuẩn của ESLint

  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs", // Dành cho dự án Node.js dùng require()
      globals: {
        ...globals.node,      
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },

  eslintConfigPrettier, // tắt các luật xung đột với Prettier
];