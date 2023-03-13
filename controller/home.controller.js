const db = require("../model/db.model.js");
const { use } = require("../routes/home.router.js");

class HomeController {
  getConnectServer = async (req, res, next) => {
    try {
      res.status(200).json({
        message: "Server run successfully",
      });
    } catch (error) {
      res.status(404).json({
        message: "failed",
      });
      next(error);
    }
  };

  getAllProducts = async (req, res, next) => {
    try {
      const productList = await db.getAllProducts();
      res.status(200).json({
        message: "success",
        data: productList,
      });
    } catch (error) {
      res.status(404).json({
        message: "failed",
      });
      next(error);
    }
  };

  getAllCarts = async (req, res, next) => {
    try {
      const productList = await db.getAllCarts();
      res.status(200).json({
        message: "success",
        data: productList,
      });
    } catch (error) {
      res.status(404).json({
        message: "failed",
      });
      next(error);
    }
  };

  getAllPosts = async (req, res, next) => {
    try {
      const productList = await db.getAllPosts();
      res.status(200).json({
        message: "success",
        data: productList,
      });
    } catch (error) {
      res.status(404).json({
        message: "failed",
      });
      next(error);
    }
  };

  getAllUsers = async (req, res, next) => {
    try {
      const productList = await db.getAllUsers();
      res.status(200).json({
        message: "success",
        data: productList,
      });
    } catch (error) {
      res.status(404).json({
        message: "failed",
      });
      next(error);
    }
  };

  changeUserStatus = async (req, res, next) => {
    try {
      // const { uid, displayName, email, photoURL } = user;
      const info = req.body;
      console.log(info);
      const [user] = await db.getUserByUid(info.uid);

      // User has login before
      if (user) {
        console.log("Recent user");
        // Change user status
        user.status = !user.status;
        await db.changeStatus(user);
      }
      // User login first time
      else {
        console.log("New user");
        const newUser = {
          uid: info.uid,
          display_name: info.displayName,
          email: info.email,
          photo_url: info.photoURL,
          status: true,
          role: "user",
        };

        // Create new User
        await db.createNewUser(newUser);
      }
      res.status(200).json({
        message: "success",
      });
    } catch (error) {
      res.status(404).json({
        message: "failed",
      });
      next(error);
    }
  };
}

module.exports = new HomeController();
