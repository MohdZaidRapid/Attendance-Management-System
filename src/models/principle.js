const mongoose = require("mongoose");
require("dotenv").config();
// const validator = require("validator");

const principleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    default: "principle",
  },
});

const Principle = mongoose.model("Principle", principleSchema);

module.exports = Principle;
