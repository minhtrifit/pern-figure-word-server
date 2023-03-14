const initOptions = {};
const pgp = require("pg-promise")(initOptions);
const dbStringConfig = require("../config/dbConfig.js");

// Lấy String connect để kết nối database
const db = pgp(dbStringConfig);

async function getAllProducts() {
  const rs = await db.any('SELECT * FROM "products"');
  return rs;
}

async function getProductById(id) {
  const rs = await db.any('SELECT * FROM "products" WHERE id = $1', [id]);
  return rs;
}

async function getAllCarts() {
  const rs = await db.any('SELECT * FROM "carts"');
  return rs;
}

async function getCartByOrderId(id) {
  const rs = await db.any('SELECT * FROM "carts" WHERE order_id = $1', [id]);
  return rs;
}

async function getCartByUserEmail(email) {
  const rs = await db.any(
    `SELECT order_id, user_email, product_id, amount, price, TO_CHAR(date, 'dd/mm/yyyy') "date" FROM "carts" WHERE user_email = $1`,
    [email]
  );
  return rs;
}

async function createNewCarts(cart) {
  const rs = await db.one(
    'INSERT INTO "carts"(order_id, user_email, product_id, amount, price, date) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    [
      cart.order_id,
      cart.user_email,
      cart.product_id,
      cart.amount,
      cart.price,
      cart.date,
    ]
  );
}

async function getAllPosts() {
  const rs = await db.any('SELECT * FROM "posts"');
  return rs;
}

async function getAllUsers() {
  const rs = await db.any('SELECT * FROM "users"');
  return rs;
}

async function getUserByEmail(email) {
  const rs = await db.any('SELECT * FROM "users" WHERE email = $1', [email]);
  return rs;
}

async function createNewUser(user) {
  const rs = await db.one(
    'INSERT INTO "users"(uid, display_name, email, photo_url, status, role) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    [
      user.uid,
      user.display_name,
      user.email,
      user.photo_url,
      user.status,
      user.role,
    ]
  );
}

async function deleteUserByUid(uid) {
  const rs = await db.one('DELETE FROM "users" WHERE uid = $1 RETURNING *', [
    uid,
  ]);
}

async function deleteUserByEmail(email) {
  const rs = await db.one('DELETE FROM "users" WHERE email = $1 RETURNING *', [
    email,
  ]);
}

async function changeStatus(user) {
  const rs = await db.one(
    'UPDATE "users" SET status = $2 WHERE uid = $1 RETURNING *',
    [user.uid, user.status]
  );
}

module.exports = {
  getAllProducts,
  getProductById,
  getAllCarts,
  getCartByOrderId,
  getCartByUserEmail,
  createNewCarts,
  getAllPosts,
  getAllUsers,
  getUserByEmail,
  deleteUserByUid,
  deleteUserByEmail,
  createNewUser,
  changeStatus,
};
