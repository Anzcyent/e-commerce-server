const express = require("express");
require("dotenv").config();
const connectDB = require('./helpers/db/connectDb')
const routers = require("./routers");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middlewares/error/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api", routers);
app.use(errorHandler);

app.listen(PORT, console.log(`Server started on port ${PORT} | ${process.env.NODE_ENV}`));