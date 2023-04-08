const TeachableMachine = require("@sashido/teachablemachine-node");

const model = new TeachableMachine({
  modelUrl: "https://teachablemachine.withgoogle.com/models/b6Vf02Tmc/",
});

const imagePredictor = async (req, res, next) => {
  const imagDataUrl = req.body.imageDataUrl;
  console.log(imagDataUrl);
  if (!imagDataUrl) {
    res.status(401).json({
      code: 401,
      status: "fail",
      error: "Please provide an image",
    });
  }
  console.log("Got the file");
  model
    .classify({
      imageUrl: imagDataUrl,
    })
    .then((predictions) => {
      res.json({
        code: 200,
        status: "success",
        predictions,
      });
      next();
    })
    .catch((e) => {
      console.log("error", e);
      res.status(500).send({
        code: 500,
        status: "fail",
        message: "Something went wrong!",
      });
    });
};

module.exports = imagePredictor;
