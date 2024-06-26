const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
// const errorMiddleware = require("./middlewares/error");

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", product);
app.use("/api/v1", user);
// app.use(errorMiddleware);

module.exports = app;
