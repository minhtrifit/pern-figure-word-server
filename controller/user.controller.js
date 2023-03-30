const db = require("../model/db.model.js");

class UserController {
  getAllUsers = async (req, res, next) => {
    try {
      const userList = await db.getAllUsers();

      res.status(200).json({
        message: "success",
        data: userList,
      });
    } catch (error) {
      res.status(404).json({
        message: "failed",
      });
      next(error);
    }
  };

  getTargetUser = async (req, res, next) => {
    try {
      const { email } = req.params;
      const [user] = await db.getUserByEmail(email);

      if (user) {
        res.status(200).json({
          message: "success",
          data: user,
        });
      } else {
        res.status(404).json({
          message: "user not found",
        });
      }
    } catch (error) {
      res.status(404).json({
        message: "failed",
      });
      next(error);
    }
  };

  changeUserStatus = async (req, res, next) => {
    try {
      // { email, uid, displayName, photoURL }
      const info = req.body;
      // console.log(info);
      const [user] = await db.getUserByEmail(info.email);

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

  editUserByEmail = async (req, res, next) => {
    try {
      const user = req.body;
      const [checkUser] = await db.getUserByEmail(user.email);

      if (checkUser) {
        await db.editUserByEmail(user);
        res.status(200).json({
          message: "success",
        });
      } else {
        res.status(200).json({
          message: "user not found",
        });
      }
    } catch (error) {
      res.status(404).json({
        message: "failed",
      });
      next(error);
    }
  };

  deleteUserByEmail = async (req, res, next) => {
    try {
      const { email } = req.body;
      const [result] = await db.getUserByEmail(email);
      // console.log(result);

      // User found
      if (result) {
        await db.deleteUserByEmail(email);
        res.status(200).json({
          message: "success",
        });
      }
      // User not found
      else {
        res.status(404).json({
          message: "user not found",
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

module.exports = new UserController();
