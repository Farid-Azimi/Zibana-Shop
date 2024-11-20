const express = require("express");
const { check } = require("express-validator");

const productsControllers = require("../controllers/products-controller");

const router = express.Router();

router.get("/most-sold", productsControllers.getMostSoldProducts);

router.get("/latest", productsControllers.getLatestProducts);

router.get("/category/:category", productsControllers.getProductsByCategory);

router.get("/:pid", productsControllers.getProductById);

router.get("/user/:uid", productsControllers.getProductsByUserId);

router.post(
  "/",
  [
    check("title")
      .notEmpty()
      .withMessage("Title is required.")
      .isLength({ max: 100 })
      .withMessage("Title cannot exceed 100 characters."),
    check("brand").notEmpty().withMessage("Brand is required."),
    check("description")
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters long."),
    check("originalPrice")
      .isFloat({ min: 0 })
      .withMessage("Original price must be a positive number."),
    check("discountedPrice")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Discounted price must be a positive number.")
      .custom((value, { req }) => {
        if (value >= req.body.originalPrice) {
          throw new Error(
            "Discounted price must be less than the original price."
          );
        }
        return true;
      }),
    check("discountPercentage")
      .optional()
      .isFloat({ min: 0, max: 100 })
      .withMessage("Discount percentage must be between 0 and 100."),
    check("inventory")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Inventory must be a non-negative integer."),
    check("category")
      .isArray({ min: 1 })
      .withMessage("Category must be an array with at least one element."),
    check("category.*")
      .isString()
      .withMessage("Each category must be a string."),
    check("imageSrc").notEmpty().withMessage("Image source is required."),
  ],
  productsControllers.createProduct
);

router.patch(
  "/:pid",
  [
    check("title")
      .notEmpty()
      .withMessage("Title is required.")
      .isLength({ max: 100 })
      .withMessage("Title cannot exceed 100 characters."),
    check("brand").notEmpty().withMessage("Brand is required."),
    check("description")
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters long."),
    check("originalPrice")
      .isFloat({ min: 0 })
      .withMessage("Original price must be a positive number."),
    check("discountedPrice")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Discounted price must be a positive number.")
      .custom((value, { req }) => {
        if (value >= req.body.originalPrice) {
          throw new Error(
            "Discounted price must be less than the original price."
          );
        }
        return true;
      }),
    check("discountPercentage")
      .optional()
      .isFloat({ min: 0, max: 100 })
      .withMessage("Discount percentage must be between 0 and 100."),
    check("inventory")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Inventory must be a non-negative integer."),
    check("category")
      .isArray({ min: 1 })
      .withMessage("Category must be an array with at least one element."),
    check("category.*")
      .isString()
      .withMessage("Each category must be a string."),
    check("imageSrc").notEmpty().withMessage("Image source is required."),
  ],
  productsControllers.updateProduct
);

router.delete("/:pid", productsControllers.deleteProduct);

module.exports = router;
