const initOptions = {};
const pgp = require("pg-promise")(initOptions);
const dbStringConfig = require("../config/dbConfig.js");

// Lấy String connect để kết nối database
const db = pgp(dbStringConfig);

async function getAllProducts() {
  const rs = await db.any('SELECT * FROM "products"');
  return rs;
}

async function getAllCarts() {
  const rs = await db.any('SELECT * FROM "carts"');
  return rs;
}

async function getAllPosts() {
  const rs = await db.any('SELECT * FROM "posts"');
  return rs;
}

async function getAllUsers() {
  const rs = await db.any('SELECT * FROM "users"');
  return rs;
}

async function getUserByUid(uid) {
  const rs = await db.any('SELECT * FROM "users" WHERE uid = $1', [uid]);
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

async function changeStatus(user) {
  const rs = await db.one(
    'UPDATE "users" SET status = $2 WHERE uid = $1 RETURNING *',
    [user.uid, user.status]
  );
}

// async function createNewTask(task) {
//   const rs = await db.one(
//     'INSERT INTO "tasks"(id, name, status) VALUES($1, $2, $3) RETURNING *',
//     [task.id, task.name, task.status]
//   );
// }

// async function deleteTask(task) {
//   const rs = await db.one('DELETE FROM "tasks" WHERE id = $1 RETURNING *', [
//     task.id,
//     task.name,
//     task.status,
//   ]);
// }

module.exports = {
  getAllProducts,
  getAllCarts,
  getAllPosts,
  getAllUsers,
  getUserByUid,
  createNewUser,
  changeStatus,
};
