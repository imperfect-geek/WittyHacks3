const EWaste = require("../models/eWaste");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const eWasteInfo = async (req, res, next) => {
  try {
    console.log(req.body);
    if (req.body.title) {
      const newPost = new EWaste();
      newPost.title = req.body.title;
      newPost.description = req.body.description;
      const { image } = req.body.image;
      const imageOnCloud = await cloudinary.v2.uploader.upload(image, {
        folder: "/voidtrash",
      });
      //console.log(req.file);
      newPost.image = imageOnCloud.secure_url;
      //console.log(req.userId);
      newPost.user = req.userId;
      await newPost.save();
      res.status(200).json({
        code: 200,
        status: "success",
        message: `added new post`,
      });
    } else throw new Error("incomplete form!!");
  } catch (error) {
    res.status(400).send({
      code: 400,
      status: "fail",
      message: error.message,
    });
  }

  next();
};

module.exports = eWasteInfo;
