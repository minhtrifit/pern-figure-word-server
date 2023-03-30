const homeRouter = require("../routes/home.router.js");
const userRouter = require("../routes/user.router.js");
const productRouter = require("../routes/product.router.js");
const cartRouter = require("../routes/cart.router.js");
const postRouter = require("../routes/post.router.js");

function route(app) {
  app.use("/posts", postRouter);
  app.use("/carts", cartRouter);
  app.use("/products", productRouter);
  app.use("/users", userRouter);
  app.use("/", homeRouter);
}

module.exports = route;
