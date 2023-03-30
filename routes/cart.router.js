var express = require("express");
var router = express.Router();
const CartController = require("../controller/cart.controller.js");

router.get("/", CartController.getAllCarts);
router.get("/:email", CartController.getTotalCartByUserEmail); // Get all order of 1 user
router.post("/confirm", CartController.confirmCart); // Create new order (1 order inclues many products) [{user_email, product_id, amount, price}, ...]

module.exports = router;
