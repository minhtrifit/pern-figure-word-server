const db = require("../model/db.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const guidGenerator = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

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

  getAllAccountUsers = async (req, res, next) => {
    try {
      const userList = await db.getAllUsers();
      const userAccountList = userList.filter((user) => {
        return user.password !== null;
      });

      res.status(200).json({
        message: "success",
        userList: userAccountList,
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

  handleUserRegister = async (req, res, next) => {
    try {
      const data = req.body;
      // console.log(data);

      const [checkUserEmail] = await db.getUserByEmail(data.email);

      // If user has init
      if (checkUserEmail) {
        res.status(404).json({
          message: "User has been init",
        });
      } else {
        const hashPassword = await bcrypt.hash(data.password, 10);
        const userData = {
          email: data.email,
          password: hashPassword,
          uid: guidGenerator(),
          display_name: data.displayName,
          status: false,
          role: "user",
        };

        if (userData) {
          console.log(userData);
          await db.createNewUser2(userData);
        }

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

  handleUserLogin = async (req, res, next) => {
    try {
      const data = req.body;
      // console.log(data);

      const [targetUser] = await db.getUserByEmail(data.email);

      if (targetUser) {
        const checkPassword = await bcrypt.compare(
          data.password,
          targetUser.password
        );

        if (checkPassword) {
          const payload = {
            email: targetUser.email,
          };

          const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            // expiresIn: "1m",
          });

          res.status(200).json({
            message: "success",
            token: token,
          });
        } else {
          res.status(200).json({
            message: "User or password incorrect",
          });
        }
      } else {
        res.status(200).json({
          message: "User not found",
        });
      }
    } catch (error) {
      res.status(404).json({
        message: "failed",
      });
      next(error);
    }
  };

  handleVerifyToken = async (req, res, next) => {
    try {
      const { token } = req.body;
      // console.log(token);

      if (!token) {
        return res.status(403).json({ message: "authorization denied" });
      } else {
        const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { email } = verify;

        const [targetUser] = await db.getUserByEmail(email);

        // Data to client
        const userData = {
          email: targetUser.email,
          displayName: targetUser.display_name,
          uid: targetUser.uid,
        };

        res.status(200).json({
          message: "success",
          user: userData,
        });
      }
    } catch (error) {
      res.status(401).json({ message: "token is not valid" });
    }
  };

  handleUserAuth = async (req, res, next) => {
    try {
      // Data from client: { email, uid, displayName, photoURL }

      const info = req.body;
      // console.log(info);

      const [user] = await db.getUserByEmail(info.email);

      // User has login before
      if (user) {
        // console.log("Recent user");

        // Change user status
        user.status = !user.status;
        await db.changeStatus(user);
      }
      // User login first time
      else {
        // console.log("New user");

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
