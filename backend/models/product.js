const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    category: [{ type: String, required: true }],
    description: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: false },
    discountPercentage: { type: Number, required: false },
    imageSrc: { type: String, required: true },
    inventory: { type: Number, required: true, default: 0 },
    soldCount: { type: Number, required: false, default: 0 },
    likedUsers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

productSchema.index({ title: 'text' });


module.exports = mongoose.model("Product", productSchema);