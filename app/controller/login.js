const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwstSecret = process.env.JWT_SECRET;

const generateAuthToken = (id, contact) => {
  const token = jwt.sign({ id, contact }, jwstSecret, {
    expiresIn: "1800s",
  });
  return token;
};

const login = async (req, res, next) => {
  try {
    if (req.body.credential && req.body.password) {
      const user = await User.findByCredentials(
        req.body.credential,
        req.body.password
      );
      if (user) {
        const token = generateAuthToken(user._id, user.contact);
        res
          .cookie("token", token)
          .status(200)
          .json({
            code: 200,
            status: "success",
            message: `${user.name} Login Successful!`,
            user
          });
      } else {
        throw new Error("User not found!");
      }
    } else throw new Error("Enter proper details!");
  } catch (error) {
    console.log(error);
    res.status(400).send({
      code: 400,
      status: "fail",
      message: error.message,
    });
  }
  next();
};

module.exports = login;
