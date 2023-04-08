const validator = require("validator");
const Users = require("../models/user");

const signUp = async (req, res, next) => {
  try {
    console.log(
      req.body.name,
      validator.isEmail(req.body.email),
      req.body.contact.toString().length === 10,
      req.body.password,
      req.body.address.pincode.toString().length === 6,
      req.body.address.longitude,
      req.body.address.latitude
    );
    if (
      req.body.name &&
      validator.isEmail(req.body.email) &&
      req.body.contact.toString().length === 10 &&
      req.body.password &&
      req.body.address.pincode.toString().length === 6 &&
      req.body.address.longitude &&
      req.body.address.latitude
    ) {
      const { name, email, contact, password } = req.body;

      const check = await Users.exists({ $or: [{ email }, { contact }] });
      if (check) {
        throw new Error("User already exists!");
      } else {
        try {
          const user = new Users({
            name,
            email,
            contact,
            password,
            address: {
              pincode: req.body.address.pincode.toString(),
              location: {
                coordinates: [
                  req.body.address.longitude,
                  req.body.address.latitude,
                ],
              },
            },
          });
          await user.save();
        } catch (error) {
          console.log("in catch");
          console.log();
          console.log(error);
          console.log();
          console.log();
        }

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
