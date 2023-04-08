const webpush = require("web-push");
const Users = require("../models/user");
require("dotenv").config();

const fetchVehiclePosition = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;

    const geometry = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    const usersNearby = await Users.find(
      {
        address: {
          location: {
            $nearSphere: { $geometry: geometry, $maxDistance: 50 },
          },
        },
        isNotified: false,
      },
      "-_id subscription"
    ).lean();

    const devices = usersNearby.map(({ subscription }) =>
      JSON.parse(subscription)
    );

    const vapidKeys = {
      publicKey: process.env.PUBLIC_KEY,
      privateKey: process.env.PRIVATE_KEY,
    };

    webpush.setVapidDetails(
      "mailto:example@yourdomain.org",
      vapidKeys.publicKey,
      vapidKeys.privateKey
    );

    const payload = JSON.stringify({ title: "Push Test" });

    devices.forEach(async (device) => {
      webpush
        .sendNotification(device, payload)
        .catch((err) => console.error(err));
    });

    res.status(200).json({
      code: 200,
      status: "success",
      message: `Notifications Sent!`,
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

module.exports = fetchVehiclePosition;
