const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post(
  "/signup",
  [
    check("firstName").not().isEmpty(),
    check("lastName").not().isEmpty(),
    check("phoneNumber").isLength({ min: 10 }).isNumeric(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

router.get("/existence", usersController.checkExistence);

router.post("/like", usersController.toggleLikeProduct);

module.exports = router;
