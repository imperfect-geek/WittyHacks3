const mongoose = require("mongoose");

const BinLocationSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: { type: [Number], default: [0, 0] },
  },
});

BinLocationSchema.index({ location: "2dsphere" });

const BinLocations = mongoose.model("binLocations", BinLocationSchema);

module.exports = BinLocations;
