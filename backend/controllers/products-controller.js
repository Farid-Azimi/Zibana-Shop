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

const createProducts = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const products = req.body.products;

  if (!Array.isArray(products) || products.length === 0) {
    throw new HttpError("No products provided or invalid format.", 400);
  }

  const createdProducts = [];

  for (const product of products) {
    const {
      title,
      brand,
      category,
      description,
      originalPrice,
      discountedPrice,
      discountPercentage,
      imageSrc,
      inventory,
      soldCount,
      averageRating,
      views,
    } = product;

    let finalDiscountedPrice = discountedPrice;
    let finalDiscountPercentage = discountPercentage;

    if (originalPrice && discountedPrice) {
      finalDiscountPercentage = Math.round(
        ((originalPrice - discountedPrice) / originalPrice) * 100
      );
    } else if (originalPrice && discountPercentage) {
      finalDiscountedPrice = originalPrice * (1 - discountPercentage / 100);
    }

    const newProduct = new Product({
      title,
      brand,
      category,
      description,
      originalPrice,
      discountedPrice: finalDiscountedPrice,
      discountPercentage: finalDiscountPercentage,
      imageSrc,
      inventory: inventory || 0,
      soldCount: soldCount || 0,
      averageRating: averageRating || 0,
      views: views || 0,
      likedUsers: [],
    });

    try {
      const savedProduct = await newProduct.save();
      createdProducts.push(savedProduct);
    } catch (err) {
      const error = new HttpError(
        `Failed to create product: ${err.message}`,
        500
      );
      return next(error);
    }
  }

  res.status(201).json({ products: createdProducts });
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
    products = await Product.find({ category: { $in: [categoryName] } }).limit(
      limit
    );
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

const getMostLikedProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const mostLikedProducts = await Product.find()
      .sort({ likedUsers: -1 })
      .limit(limit);

    res.status(200).json({
      data: mostLikedProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch most liked products",
    });
  }
};

const getAllProductIds = async (req, res, next) => {
  try {
    const products = await Product.find({}, "_id");
    const productIds = products.map((product) => product._id);

    res.status(200).json({ productIds });
  } catch (err) {
    const error = new HttpError(
      "Fetching product IDs failed, please try again.",
      500
    );
    return next(error);
  }
};

const getDiscountedProducts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;

    const discountedProducts = await Product.find({
      discountedPrice: { $gt: 0 },
    }).limit(limit);

    res.status(200).json({ data: discountedProducts });
  } catch (err) {
    const error = new HttpError(
      "Fetching discounted products failed, please try again.",
      500
    );
    return next(error);
  }
};

const search = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const products = await Product.find({
      title: { $regex: q, $options: "i" },
    });

    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during the search" });
  }
};

exports.getProductById = getProductById;
exports.getProductsByUserId = getProductsByUserId;
exports.createProducts = createProducts;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getProductsByCategory = getProductsByCategory;
exports.getLatestProducts = getLatestProducts;
exports.getMostSoldProducts = getMostSoldProducts;
exports.getMostLikedProducts = getMostLikedProducts;
exports.getAllProductIds = getAllProductIds;
exports.getDiscountedProducts = getDiscountedProducts;
exports.search = search;
