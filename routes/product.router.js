var express = require("express");
var router = express.Router();
const ProductController = require("../controller/product.controller.js");

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById); // Get product id with router params
router.get("/search/:key", ProductController.searchProduct); // Get product name with router params

module.exports = router;
