const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// const validator = require("validator");

const principleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: false,
    },
    role: {
      type: String,
      default: "principle",
    },
  },
  {
    timestamps: true,
  }
);

principleSchema.methods.getJWt = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_TOKEN);

  return token;
};

const Principle = mongoose.model("Principle", principleSchema);

module.exports = Principle;
