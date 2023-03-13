const db = require("../model/db.model.js");

function isExistId(id, list) {
  list.map((task) => {
    return task.id === id;
  });
  return false;
}

class HomeController {
  getConnectServer = async (req, res, next) => {
    try {
      res.status(200).json({
        message: "Server run successfully",
      });
    } catch (error) {
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
      next(error);
    }
  };
}

module.exports = new HomeController();
