const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const port = process.env.SERVER_PORT || 3000;
const cors = require("cors");
const mongoURI = process.env.MONGO_URL;
const corsOptions = {
  origin: "*", // Allow requests from any origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/products", require("./api/products/router"));
app.use("/api/users", require("./api/users/router"));
app.use("/api/brands", require("./api/brands/router"));
app.use("/api/category", require("./api/categories/router"));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
