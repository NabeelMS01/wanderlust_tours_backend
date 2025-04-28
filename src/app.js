const express = require("express");

const mainRouter = require("./routes");
const cors = require("cors");

const logger = require("./middlewares/logger.middleware");
const mongoose = require("mongoose");
const { swaggerUi, specs } = require("./config/swagger");
const app = express();
const path = require('path');

require("./cron/bookingCleaner.cron");

mongoose
  .connect(
    process.env.MONGO_DB_URL || "mongodb://127.0.0.1:27017/wanderlustTours"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(logger);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
// Swagger Route
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api", mainRouter);

module.exports = app;
