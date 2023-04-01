const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./routes/index.js");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route(app);

app.listen(port, () => {
  console.log(`Listening to port: http://localhost:${port}`);
});
