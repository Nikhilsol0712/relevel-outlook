const User = require("../models/User");
const createUser = async (data) => {
  const response = {};
  try {
    const userObj = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    response.user = await User.create(userObj);
    return response;
  } catch (err) {
    console.log("Error: ", err);
    response.error = err.message;
    return response;
  }
};

const jwt = require("jsonwebtoken");
require("dotenv").config();

const verfiyJwtToken = (token) => {
  try {
    var decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decodedToken;
  } catch (err) {
    return err.message;
  }
};

module.exports = { createUser, verfiyJwtToken };
