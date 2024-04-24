const mongoose = require("mongoose");
const { MONGO_URL } = process.env;

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
    // Start your Express server or perform other operations
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
module.exports = mongoose.connection;
