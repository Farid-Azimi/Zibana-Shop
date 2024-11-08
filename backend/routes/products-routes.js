const express = require("express");
const { check } = require("express-validator");

const productsControllers = require("../controllers/products-controller");

const router = express.Router();

router.get("/:pid", productsControllers.getProductById);

router.get("/user/:uid", productsControllers.getProductsByUserId);

router.post(
  "/",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  productsControllers.createProduct
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  productsControllers.updateProduct
);

router.delete("/:pid", productsControllers.deleteProduct);

module.exports = router;
