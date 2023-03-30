var express = require("express");
var router = express.Router();
const PostController = require("../controller/post.controller.js");

router.get("/", PostController.getAllPosts);
router.post("/create", PostController.createNewPosts); // {user_email, product_id, content}
router.delete("/delete", PostController.deletePostsById); // {id, user_email}
router.put("/edit", PostController.editPostsById); // {id, user_email, product_id, content}

module.exports = router;
