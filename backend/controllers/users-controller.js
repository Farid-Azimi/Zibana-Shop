const { validationResult } = require("express-validator");

const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const User = require("../models/user");
const Product = require("../models/product");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passes, please check your data.", 422)
    );
  }

  const { firstName, lastName, email, password, phoneNumber } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    address: null,
    likedProducts: [],
  });

  try {
    createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later",
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "Invalid credential, could not log you in",
      401
    );
    return next(error);
  }

  res.json({
    firstName: existingUser.firstName,
    lastName: existingUser.lastName,
    email: email,
  });
};

const checkExistence = async (req, res, next) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (err) {
    return next(
      new HttpError("Checking existence failed, please try again.", 500)
    );
  }
};

const toggleLikeProduct = async (req, res, next) => {
  const { userId, productId } = req.body;

  // Start a session
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Fetch the user and product documents in the session
    const user = await User.findById(userId).session(session);
    const product = await Product.findById(productId).session(session);

    if (!user || !product) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "User or Product not found." });
    }

    // Check if the product is already liked by the user
    const isLiked = user.likedProducts.includes(productId);

    if (isLiked) {
      // If already liked, remove the productId from user's likedProducts
      user.likedProducts = user.likedProducts.filter(
        (id) => id.toString() !== productId
      );
      // Remove the userId from product's likedUsers
      product.likedUsers = product.likedUsers.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // If not liked, add productId to user's likedProducts and userId to product's likedUsers
      user.likedProducts.push(productId);
      product.likedUsers.push(userId);
    }

    // Save both documents as part of the transaction
    await user.save({ session });
    await product.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: isLiked
        ? "Product unliked successfully."
        : "Product liked successfully.",
    });
  } catch (err) {
    // Abort transaction on error
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Toggling like failed.", error: err });
  }
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.checkExistence = checkExistence;
exports.toggleLikeProduct = toggleLikeProduct;
