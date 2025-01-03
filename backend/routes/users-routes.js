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
    check("email").isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

router.get("/existence", usersController.checkExistence);

router.post("/create", usersController.createUsers);

router.use(usersController.authenticate);

router.post("/like", usersController.toggleLikeProduct);

router.post("/add-view-history", usersController.addViewHistory);

router.get("/liked-products/:userId", usersController.getLikedProducts);

router.patch(
  "/:id",
  [
    check("firstName").optional().not().isEmpty().withMessage("First name cannot be empty."),
    check("lastName").optional().not().isEmpty().withMessage("Last name cannot be empty."),
    check("phoneNumber").optional().isLength({ min: 10 }).withMessage("Phone number must be at least 10 digits.")
      .isNumeric().withMessage("Phone number must contain only numbers."),
    check("password").optional().isLength({ min: 6 }).withMessage("Password must be at least 6 characters."),
    check("address").optional().isString(),
  ],
  usersController.updateUser
);

router.get("/:id", usersController.getUserById);

module.exports = router;

