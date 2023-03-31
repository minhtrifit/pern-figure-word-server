const initOptions = {};
const pgp = require("pg-promise")(initOptions);
const dbStringConfig = require("../config/dbConfig.js");

// Lấy String connect để kết nối database
const db = pgp(dbStringConfig);

//========== PRODUCTS

async function getAllProducts() {
  const rs = await db.any('SELECT * FROM "products"');
  return rs;
}

async function getProductById(id) {
  const rs = await db.any('SELECT * FROM "products" WHERE id = $1', [id]);
  return rs;
}

//========== CARTS

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

//========== POSTS

async function getAllPosts() {
  const rs = await db.any('SELECT * FROM "posts"');
  return rs;
}

async function createNewPosts(post) {
  const rs = await db.one(
    'INSERT INTO "posts"(user_email, product_id, content, rating, date) VALUES($1, $2, $3, $4, $5) RETURNING *',
    [post.user_email, post.product_id, post.content, post.rating, post.date]
  );
}

async function deletePostsById(id, email) {
  const rs = await db.one(
    'DELETE FROM "posts" WHERE id = $1 AND user_email = $2 RETURNING *',
    [id, email]
  );
}

async function editPostById(post) {
  const rs = await db.one(
    'UPDATE "posts" SET product_id = $3, content = $4, date = $5 WHERE id = $1 AND user_email = $2 RETURNING *',
    [post.id, post.user_email, post.product_id, post.content, post.date]
  );
}

//========== USERS

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
    'INSERT INTO "users"(email, uid, display_name, photo_url, status, role) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    [
      user.email,
      user.uid,
      user.display_name,
      user.photo_url,
      user.status,
      user.role,
    ]
  );
}

async function createNewUser2(user) {
  const rs = await db.one(
    'INSERT INTO "users"(email, password, uid, display_name, status, role) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    [
      user.email,
      user.password,
      user.uid,
      user.display_name,
      user.status,
      user.role,
    ]
  );
}

async function deleteUserByEmail(email) {
  const rs = await db.one('DELETE FROM "users" WHERE email = $1 RETURNING *', [
    email,
  ]);
}

async function editUserByEmail(user) {
  const rs = await db.one(
    'UPDATE "users" SET uid = $2, display_name = $3, photo_url = $4  WHERE email = $1 RETURNING *',
    [user.email, user.uid, user.display_name, user.photo_url]
  );
}

async function changeStatus(user) {
  const rs = await db.one(
    'UPDATE "users" SET status = $2 WHERE email = $1 RETURNING *',
    [user.email, user.status]
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
  createNewPosts,
  deletePostsById,
  editPostById,
  getAllUsers,
  getUserByEmail,
  deleteUserByEmail,
  createNewUser,
  createNewUser2,
  editUserByEmail,
  changeStatus,
};
