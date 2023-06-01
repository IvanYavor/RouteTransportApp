const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  // .connect("mongodb://127.0.0.1:27017/logistics", { useNewUrlParser: true })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
