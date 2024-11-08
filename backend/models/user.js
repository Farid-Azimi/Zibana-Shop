const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: false },
  likedProducts: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Product" },
  ],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
