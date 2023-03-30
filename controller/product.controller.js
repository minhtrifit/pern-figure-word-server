const db = require("../model/db.model.js");

class ProductController {
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

  getProductById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const [product] = await db.getProductById(id);

      if (product) {
        res.status(200).json({
          message: "success",
          data: product,
        });
      } else {
        res.status(404).json({
          message: "404 not found",
        });
      }
    } catch (error) {
      res.status(404).json({
        message: "failed",
      });
      next(error);
    }
  };

  searchProduct = async (req, res, next) => {
    try {
      const { key } = req.params;
      let check = false;
      let data = [];
      const productList = await db.getAllProducts();
      // console.log(key);

      data = productList.filter((item) => {
        return item.name.toUpperCase().includes(key.toUpperCase());
      });

      // Find products
      if (data.length !== 0) {
        check = true;
      }

      if (check === true) {
        res.status(200).json({
          message: "success",
          data: data,
        });
      } else {
        res.status(404).json({
          message: "404 not found",
        });
      }
    } catch (error) {
      res.status(404).json({
        message: "failed",
      });
      next(error);
    }
  };
}

module.exports = new ProductController();
