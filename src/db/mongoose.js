const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongo db connected");
  }
);
