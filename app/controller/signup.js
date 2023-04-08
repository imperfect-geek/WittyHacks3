const validator = require("validator");
const Users = require("../models/user");

const signUp = async (req, res, next) => {
  try {
    if (
      req.body.name &&
      validator.isEmail(req.body.email) &&
      validator.isMobilePhone(req.body.contact.toString(), "en-IN") &&
      // validator.isStrongPassword(req.body.password, {
      //   minLength: 6,
      //   minLowercase: 1,
      //   minUppercase: 1,
      //   minNumbers: 1,
      //   minSymbols: 1,
      //   returnScore: false,
      // }) &&
      req.body.address.pincode.toString().length === 6 &&
      req.body.address.addressLine &&
      req.body.address.locality &&
      req.body.address.city &&
      req.body.address.state
    ) {
      const { name, email, contact, password, address } = req.body;

      const check = await Users.exists({ $or: [{ email }, { contact }] });
      if (check) {
        throw new Error("User already exists!");
      } else {
        const user = new Users({
          name,
          email,
          contact,
          password,
          address,
        });
        await user.save();

        res.status(200).send({
          code: 200,
          status: "Success",
          message: "User Successfully Signed-UP!",
        });
      }
    } else throw new Error("Enter all the required fields properly!");
  } catch (error) {
    console.log("error", error);
    res.status(400).send({
      code: 400,
      status: "Failed",
      message: error.message,
    });
  }
  next();
};

module.exports = signUp;
