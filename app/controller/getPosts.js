const eWaste = require("../models/eWaste");

const getPosts = async (req, res, next) => {
  const page = req.params.page;
  try {
    const posts = await eWaste
      .find({}, "-__v")
      .sort({ _id: -1 })
      .skip((page - 1) * 25)
      .limit(25)
      .populate({ path: "user", select: "name address.locality address.city address.state" });
    res.status(200).json({ code: 200, status: "success", posts });
  } catch (error) {
    res.status(400).send({
      code: 400,
      status: "fail",
      message: error.message,
    });
  }
  next();
};

module.exports = getPosts;
