const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api/api-error");
const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application" });
});
// localhost:3000/api/contacts/favorite
app.use("/api/contacts", contactsRouter); // coming to contacts route
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found")); // middleware process this api error response
  // if we don't use next() , behind middleware will stand by itself
});
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});
module.exports = app;
