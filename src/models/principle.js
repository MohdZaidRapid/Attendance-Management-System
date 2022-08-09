const mongoose = require("mongoose");
require("dotenv").config();
const validator = require("validator");

const principleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

principleSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_TOKEN);
  console.log(token);
  return await token;
};

const Principle = mongoose.model("Principle", principleSchema);

module.exports = Principle;
