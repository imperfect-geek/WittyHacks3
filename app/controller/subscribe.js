const Users = require("../models/user");

const subscribe = async (req, res, next) => {
  try {
    const subscription = JSON.stringify(req.body);
    const user = Users.findById(req.userId);

    user.subscription = subscription;

    await user.save();

    res.status(200).json({
      code: 200,
      status: "success",
      message: "Subscribed successfully!!!",
    });
  } catch (error) {
    res.status(400).send({
      code: 400,
      status: "fail",
      message: error.message,
    });
  }

  next();
};

module.exports = subscribe;
