const homeRouter = require("../routes/home.router.js");

function route(app) {
  app.use("/", homeRouter);
}

module.exports = route;
