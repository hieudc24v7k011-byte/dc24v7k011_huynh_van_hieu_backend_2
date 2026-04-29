module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  // Chuyển extends vào bên trong
  extends: ["eslint:recommended", "prettier"],
  // Thêm tùy chọn này để ESLint không báo lỗi khi đọc các file JS hiện đại
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    // Có thể thêm các quy tắc riêng tại đây
  },
};
