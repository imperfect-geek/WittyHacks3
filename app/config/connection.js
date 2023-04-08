const mongoose = require("mongoose");
const env = require("dotenv");
env.config();

const URI = process.env.DB_URI;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log("Succesfully connected to mongodb database!");
})