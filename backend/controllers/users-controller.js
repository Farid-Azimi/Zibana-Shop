const { validationResult } = require("express-validator");

const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const Product = require("../models/product");
const bcrypt = require("bcrypt");

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
    id: existingUser.id,
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

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId).session(session);
    const product = await Product.findById(productId).session(session);

    if (!user || !product) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "User or Product not found." });
    }

    const isLiked = user.likedProducts.includes(productId);

    if (isLiked) {
      user.likedProducts = user.likedProducts.filter(
        (id) => id.toString() !== productId
      );
      product.likedUsers = product.likedUsers.filter(
        (id) => id.toString() !== userId
      );
    } else {
      user.likedProducts.push(productId);
      product.likedUsers.push(userId);
    }

    await user.save({ session });
    await product.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: isLiked
        ? "Product unliked successfully."
        : "Product liked successfully.",
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Toggling like failed.", error: err });
  }
};

const createUsers = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const users = req.body.users;

  if (!Array.isArray(users) || users.length === 0) {
    throw new HttpError("No users provided or invalid format.", 400);
  }

  const createdUsers = [];

  for (const user of users) {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      purchaseHistory,
      ratings,
      wishlist,
      browsingHistory,
    } = user;

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      purchaseHistory: purchaseHistory || [],
      ratings: ratings || [],
      wishlist: wishlist || [],
      browsingHistory: browsingHistory || [],
    });

    try {
      const savedUser = await newUser.save();
      createdUsers.push(savedUser);
    } catch (err) {
      const error = new HttpError(
        `Failed to create user with email ${email}: ${err.message}`,
        500
      );
      return next(error);
    }
  }

  res.status(201).json({ users: createdUsers });
};

const getUserById = async (req, res, next) => {
  const userId = req.params.id;

  let user;
  try {
    user = await User.findById(userId)
      .populate('purchaseHistory.productId')
      .populate('viewHistory.productId')
      .populate('likedProducts');
  } catch (err) {
    const error = new HttpError(
      "Fetching user failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("User not found.", 404);
    return next(error);
  }

  res.json({ data: user.toObject({ getters: true }) });
};


const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const userId = req.params.id;
  const {
    firstName,
    lastName,
    password,
    phoneNumber,
    address,
    purchaseHistory,
    viewHistory,
    likedProducts,
  } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update user.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("User not found.", 404);
    return next(error);
  }

  if (firstName !== undefined) user.firstName = firstName;
  if (lastName !== undefined) user.lastName = lastName;
  if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
  if (address !== undefined) user.address = address;
  if (purchaseHistory !== undefined) user.purchaseHistory = purchaseHistory;
  if (viewHistory !== undefined) user.viewHistory = viewHistory;
  if (likedProducts !== undefined) user.likedProducts = likedProducts;

  if (password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
    } catch (err) {
      const error = new HttpError(
        "Could not update password, please try again.",
        500
      );
      return next(error);
    }
  }

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update user.",
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};


const addViewHistory = async (req, res, next) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return next(
      new HttpError("User ID and Product ID are required.", 400)
    );
  }

  let user;
  try {
    user = await User.findById(userId);
    if (!user) {
      return next(new HttpError("User not found.", 404));
    }
  } catch (err) {
    return next(
      new HttpError("Fetching user failed, please try again later.", 500)
    );
  }

  let product;
  try {
    product = await Product.findById(productId);
    if (!product) {
      return next(new HttpError("Product not found.", 404));
    }
  } catch (err) {
    return next(
      new HttpError("Fetching product failed, please try again later.", 500)
    );
  }

  user.viewHistory.push({
    productId: productId,
    viewedAt: new Date(),
  });

  try {
    await user.save();
  } catch (err) {
    return next(
      new HttpError("Updating view history failed, please try again.", 500)
    );
  }

  res.status(200).json({ message: "View history updated successfully." });
};



exports.addViewHistory = addViewHistory;
exports.updateUser = updateUser;
exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.checkExistence = checkExistence;
exports.toggleLikeProduct = toggleLikeProduct;
exports.createUsers = createUsers;

