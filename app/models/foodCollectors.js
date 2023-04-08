const mongoose = require("mongoose")

const foodCollectorSchema = new mongoose.Schema({
    name : {
        type : String
    },
    contact : {
        Primary : Number,
        Alternate: Number
    },
    address: {
        pincode: Number, // 6 digit
        addressLine: String,
        locality: String,
        city: String,
        state: String,
    }

})

const foodCollector = mongoose.model("foodCollectors", foodCollectorSchema);

module.exports = foodCollector;