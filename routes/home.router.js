var express = require("express");
var router = express.Router();
const HomeController = require("../controller/home.controller.js");

router.get("/", HomeController.getConnectServer);

// User API
router.get("/users", HomeController.getAllUsers);
router.get("/users/:uid", HomeController.getTargetUser); // Get target User by uid
router.post("/status", HomeController.changeUserStatus); // User login event handle: {uid, displayName, email, photoURL}

// Product API
router.get("/products", HomeController.getAllProducts);
router.get("/products/:id", HomeController.getProductById); // Get product id with router params
router.get("/products/search/:key", HomeController.searchProduct); // Get product name with router params

// Cart API
router.get("/carts", HomeController.getAllCarts);
router.get("/carts/:uid", HomeController.getTotalCartByUserUid); // Get all order of 1 user
router.post("/carts/confirm", HomeController.confirmCart); // Create new order (1 order inclues many products)

// Post API
router.get("/posts", HomeController.getAllPosts);

module.exports = router;
