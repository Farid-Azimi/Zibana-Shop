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
  purchaseHistory: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      purchasedAt: { type: Date, required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  ratings: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      rating: { type: Number, required: true, min: 0, max: 5 },
    },
  ]
});

userSchema.plugin(uniqueValidator);
userSchema.index({ email: 1 });

module.exports = mongoose.model("User", userSchema);
