const db = require("../model/db.model.js");
// const { use } = require("../routes/home.router.js");

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const newDate =
    year.toString() + "-" + month.toString() + "-" + day.toString();
  return newDate;
};

const checkExistOrderId = (id, list) => {
  for (var i = 0; i < list.length; ++i) {
    if (list[i] === id) {
      return true;
    }
  }
  return false;
};

const checkExistOrderId2 = (id, list) => {
  for (var i = 0; i < list.length; ++i) {
    if (list[i].order_id === id) {
      return true;
    }
  }
  return false;
};

const checkParamsIsNumber = (key) => {
  if (parseInt(key)) return true;
  return false;
};

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
}

module.exports = new HomeController();
