var express = require("express");
var router = express.Router();
const UserController = require("../controller/user.controller.js");

router.get("/", UserController.getAllUsers);
router.get("/:email", UserController.getTargetUser); // Get target User by email
router.post("/register", UserController.handleUserRegister);
router.post("/login", UserController.handleUserLogin); // {email, password}
router.post("/verify", UserController.handleVerifyToken); // {token}
router.post("/auth", UserController.handleUserAuth); // User login event handle: {email, uid, displayName, photoURL}
router.put("/edit", UserController.editUserByEmail); // {email, uid, displayName, photoURL}
router.delete("/delete", UserController.deleteUserByEmail); // {email}

module.exports = router;
