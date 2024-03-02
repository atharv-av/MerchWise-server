const express = require("express");
const app = express();
// const errorMiddleware = require("./middlewares/error");

// Route Imports
const product = require("./routes/productRoute");

app.use(express.json());
app.use("/api/v1", product);
// app.use(errorMiddleware);

module.exports = app;
