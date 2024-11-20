const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Product = require("../models/product");
const User = require("../models/user");

const getProductById = async (req, res, next) => {
  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a product.",
      500
    );
    return next(error);
  }

  if (!product) {
    const error = new HttpError(
      "Could not find a product for the provided id.",
      404
    );
    return next(error);
  }

  const productData = product.toObject({ getters: true });
  delete productData.likedUsers;

  res.json({ product: productData });
};

const getProductsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithProducts;
  try {
    userWithProducts = await User.findById(userId).populate("products");
  } catch (err) {
    const error = new HttpError(
      "Fetching products failed, please try again later",
      500
    );
    return next(error);
  }

  if (!userWithProducts || userWithProducts.products.length === 0) {
    const error = new HttpError(
      "Could not find products for the provided user id.",
      404
    );
    return next(error);
  }

  res.json({
    products: userWithProducts.products.map((product) =>
      product.toObject({ getters: true })
    ),
  });
};

const createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const {
    name,
    brand,
    category,
    subCategory,
    title,
    description,
    originalPrice,
    discountedPrice,
    discountPercentage,
    imageSrc,
  } = req.body;

  let finalDiscountedPrice = discountedPrice;
  let finalDiscountPercentage = discountPercentage;

  if (originalPrice && discountedPrice) {
    finalDiscountPercentage =
      ((originalPrice - discountedPrice) / originalPrice) * 100;
  } else if (originalPrice && discountPercentage) {
    finalDiscountedPrice = originalPrice * (1 - discountPercentage / 100);
  }

  const createdProduct = new Product({
    name,
    brand,
    category,
    subCategory,
    title,
    description,
    originalPrice,
    discountedPrice: finalDiscountedPrice,
    discountPercentage: finalDiscountPercentage,
    imageSrc,
    likedUsers: [],
  });

  try {
    await createdProduct.save();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  res.status(201).json({ product: createdProduct });
};

const updateProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passes, please check your data.", 422);
  }

  const { title, description } = req.body;
  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update product.",
      500
    );
    return next(error);
  }

  product.title = title;
  product.description = description;

  try {
    await product.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update product.",
      500
    );
    return next(error);
  }

  res.status(200).json({ product: product.toObject({ getters: true }) });
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId).populate("creator");
    if (!product) {
      const error = new HttpError(
        "Could not find place with the provided id.",
        404
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  const sess = await mongoose.startSession();
  sess.startTransaction();
  try {
    await Product.findByIdAndDelete(productId, {
      session: sess,
    });
    product.creator.products.pull(product);
    await product.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    await sess.abortTransaction();
    const error = new HttpError(err, 500);
    return next(error);
  } finally {
    sess.endSession();
  }
  res.status(200).json({ message: "Deleted product" });
};

const getProductsByCategory = async (req, res, next) => {
  const categoryName = req.params.category;

  const limit = parseInt(req.query.limit) || 10;

  let products;
  try {
    products = await Product.find({ category: { $in: [categoryName] } }).limit(limit);
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the specified category." });
    }
  } catch (err) {
    const error = new HttpError(
      "Fetching products failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
};

const getLatestProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const latestProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json({
      data: latestProducts,
    });
  } catch (error) {
    console.error("Error fetching latest products:", error);
    res.status(500).json({
      message: "Failed to fetch latest products",
    });
  }
};

const getMostSoldProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const mostSoldProducts = await Product.find()
      .sort({ soldCount: -1 })
      .limit(limit);

    res.status(200).json({
      data: mostSoldProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch most sold products",
    });
  }
};

exports.getProductById = getProductById;
exports.getProductsByUserId = getProductsByUserId;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getProductsByCategory = getProductsByCategory;
exports.getLatestProducts = getLatestProducts;
exports.getMostSoldProducts = getMostSoldProducts;

// let user;
// try {
//   user = await User.findById(creator);
// } catch (err) {
//   const error = new HttpError(
//     "Creating product failed, please try again",
//     500
//   );
//   return next(error);
// }

// if (!user) {
//   const error = new HttpError("Could not find user for provided id", 404);
//   return next(error);
// }

// try {
//   const sess = await mongoose.startSession();
//   sess.startTransaction();
//   await createdProduct.save({ session: sess });
//   user.products.push(createdProduct);
//   await user.save({ session: sess });
//   await sess.commitTransaction();
// } catch (err) {
//   const error = new HttpError(
//     "Creating product failed, please try again",
//     500
//   );
//   return next(error);
// }
