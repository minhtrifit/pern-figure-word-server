var express = require("express");
var router = express.Router();
const HomeController = require("../controller/home.controller.js");

router.get("/", HomeController.getConnectServer);
router.get("/products", HomeController.getAllProducts);
router.get("/carts", HomeController.getAllCarts);
router.get("/posts", HomeController.getAllPosts);
router.get("/users", HomeController.getAllUsers);

// NOTE: Request from client to server must be: object type

module.exports = router;
