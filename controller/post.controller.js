const db = require("../model/db.model.js");

const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const newDate =
    year.toString() + "-" + month.toString() + "-" + day.toString();
  return newDate;
};

class PostController {
  getAllPosts = async (req, res, next) => {
    try {
      const postList = await db.getAllPosts();

      res.status(200).json({
        message: "success",
        data: postList,
      });
    } catch (error) {
      res.status(404).json({
        message: "failed",
      });
      next(error);
    }
  };

  createNewPosts = async (req, res, next) => {
    try {
      const data = req.body;
      const date = getDate();

      if (data) {
        // Create new posts data
        const newData = { ...data, date: date };
        console.log(newData);
        await db.createNewPosts(newData);

        res.status(200).json({
          message: "success",
        });
      }
    } catch (error) {
      res.status(404).json({
        message: "failed",
      });
      next(error);
    }
  };

  deletePostsById = async (req, res, next) => {
    try {
      const data = req.body;
      // console.log(data);

      if (data) {
        await db.deletePostsById(data.id, data.email);

        res.status(200).json({
          message: "success",
        });
      }
    } catch (error) {
      res.status(404).json({
        message: "failed",
      });
      next(error);
    }
  };

  editPostsById = async (req, res, next) => {
    try {
      const data = req.body;

      if (data) {
        const date = getDate();

        // Create new posts data
        const newData = { ...data, date: date };
        await db.editPostById(newData);
        console.log(newData);

        res.status(200).json({
          message: "success",
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

module.exports = new PostController();
