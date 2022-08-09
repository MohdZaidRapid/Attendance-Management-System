const mongoose = require("mongoose");

const pricipleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Principle = mongoose.model("Principle", pricipleSchema);

module.exports = Principle;
