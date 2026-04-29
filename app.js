const express = require("express");
const cors = require("cors");

const ApiError = require("./app/api-error");
const contactsRouter = require("./app/routes/contact.route");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome Contactbook API" });
});

app.use("/api/contacts", contactsRouter);
// handle 404 response
app.use((req, res, next) => {
  next(new ApiError(404, "Resource not found"));
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;