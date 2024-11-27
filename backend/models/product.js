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
    averageRating: { type: Number, default: 0 },
    views: { type: Number, default: 0 }
  },
  { timestamps: true }
);

productSchema.index({ title: 1 });
productSchema.index({ averageRating: -1 });
productSchema.index({ views: -1 });


module.exports = mongoose.model("Product", productSchema);