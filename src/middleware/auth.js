const jwt = require("jsonwebtoken");
const Principle = require("../models/principle");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const principle = await Principle.findOne({
      _id: decoded._id,
    });
    if (!principle) {
      throw new Error();
    }
    req.token = token;
    req.principle = principle;

    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
