const db = require("../model/db.model.js");

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

class CartController {
  getAllCarts = async (req, res, next) => {
    try {
      const cartList = await db.getAllCarts();

      res.status(200).json({
        message: "success",
        data: cartList,
      });
    } catch (error) {
      res.status(404).json({
        message: "failed",
      });
      next(error);
    }
  };

  getTotalCartByUserEmail = async (req, res, next) => {
    try {
      const { email } = req.params;
      const cartList = await db.getCartByUserEmail(email);
      let newData = [];

      let orderIdList = [];
      // console.log(cartList);

      if (cartList) {
        // Get product id list
        for (var i = 0; i < cartList.length; ++i) {
          if (!checkExistOrderId(cartList[i].order_id, orderIdList)) {
            orderIdList.push(cartList[i].order_id);
          }
        }

        for (var i = 0; i < orderIdList.length; ++i) {
          for (var j = 0; j < cartList.length; ++j) {
            let order = {
              user_email: "",
              order_id: 0,
              date: "",
              total: 0,
              detail: [],
            };
            // Create Order list response
            if (orderIdList[i] === cartList[j].order_id) {
              // Cart not exist in order list
              if (!checkExistOrderId2(cartList[j].order_id, newData)) {
                order.user_email = cartList[j].user_email;
                order.order_id = cartList[j].order_id;
                order.date = cartList[j].date;
                order.total = cartList[j].price;
                order.detail.push(cartList[j]);
                newData.push(order);
              } else {
                for (var k = 0; k < newData.length; ++k) {
                  if (newData[k].order_id === cartList[j].order_id) {
                    newData[k].total += cartList[j].price;
                    newData[k].detail.push(cartList[j]);
                  }
                }
              }
            }
          }
        }

        res.status(200).json({
          message: "success",
          data: newData,
        });
      } else {
        res.status(404).json({
          message: "Order not found",
        });
      }
    } catch (error) {
      res.status(404).json({
        message: "failed",
      });
      next(error);
    }
  };

  confirmCart = async (req, res, next) => {
    try {
      const data = req.body; // [ {user_email, product_id, amount, price}, ... ]
      const cartList = await db.getAllCarts();
      let order_id;
      let checkOrderId;
      let newData = [];
      let date = getDate();

      do {
        order_id = getRndInteger(10000, 99999);
        checkOrderId = await db.getCartByOrderId(order_id);
      } while (checkOrderId.length !== 0);

      for (var i = 0; i < data.length; ++i) {
        let newCart = {
          order_id: order_id,
          user_email: data[i].user_email,
          product_id: data[i].product_id,
          amount: data[i].amount,
          price: data[i].price,
          date: date,
        };
        newData.push(newCart);
      }

      if (newData) {
        for (var i = 0; i < newData.length; ++i) {
          await db.createNewCarts(newData[i]);
        }
        res.status(200).json({
          message: "success",
        });
      } else {
        res.status(200).json({
          message: "failed",
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

module.exports = new CartController();
