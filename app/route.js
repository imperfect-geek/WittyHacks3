const express = require("express");
const app = express();
const router = new express.Router();
app.use(router);

//controllers
const signup = require("./controller/signup");
const login = require("./controller/login");
const binLocations = require("./controller/binLocator");
const imagePredictor = require("./controller/imagePredictor");
const verifyjwt = require("./controller/auth");
const contact = require("./controller/contact");
const chat = require("./controller/chat");
const subscribe = require("./controller/subscribe");
const fetchVehiclePosition = require("./controller/fetchVehiclePosition");

//routes
router.post("/signup", signup, (req, res) => {
  console.log("Signed Up");
});

router.post("/login", login, (req, res) => {
  console.log("User Logged In!");
});

router.get("/binlocations", binLocations, (req, res) => {
  console.log("Fetched nearest 5 bins successfully!!");
});

router.post("/imageprediction", imagePredictor, (req, res) => {
  console.log("Image Predicted Successfully!!");
});

router.post("/chat", chat);

router.post("/notify", contact, (req, res) => {
  console.log("Mail Sent");
});

router.post("/subscribe", verifyjwt, subscribe, (req, res) => {
  console.log("Subscribed Successfully!");
});

router.get("/vehicleposition", fetchVehiclePosition, (req, res) => {
  console.log("Notified!");
});

module.exports = router;
