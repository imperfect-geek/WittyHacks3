const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    contact: {
      type: Number,
      unique: true,
    },
    password: {
      type: String,
    },
    address: {
      pincode: Number, // 6 digit
      addressLine: String,
      locality: String,
      city: String,
      state: String,
    },
  },
  {
    timestamps: true,
  }
);

usersSchema.statics.findByCredentials = async (userCredential, password) => {
  try {
    var user;
    if (validator.isEmail(userCredential)) {
      user = await User.findOne({ email: userCredential });
    } else if (validator.isMobilePhone(userCredential, "en-IN")) {
      user = await User.findOne(
        { contact: userCredential },
        "-__v -createdAt -updatedAt"
      );
    }

    if (!user) {
      throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Unable to login");
    }
    user.password = undefined;
    return user;
  } catch (e) {
    throw new Error("Unable to login");
  }
};

usersSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});
//usersSchema.index({ contact : 1})

const User = mongoose.model("users", usersSchema);

module.exports = User;
