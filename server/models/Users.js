//A model used to keep the document records in the database consistent
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  recoveryCode: {
    type: String,
  }

});

UserSchema.pre('save', async function (next) {
  try{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

    this.recoveryCode = (Math.floor(Math.random() * (9999999 - 1000000) + 1000000));
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;