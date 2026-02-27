require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// middlewares
app.use(express.json());

// routers
app.use("/api", require("./route/index"));

// run port
const runServer = async () => {
  try {
    const PORT = process.env.PORT || 8080;

    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Connected to DB");

    app.listen(PORT, () => {
      console.log(`🚀 Listening on port http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};
runServer();
