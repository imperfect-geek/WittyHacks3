const mongoose = require("mongoose");
const { Schema } = mongoose;
require("../models/user");

const eWasteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "users" },
});

const eWaste = mongoose.model("eWastes", eWasteSchema);

module.exports = eWaste;
