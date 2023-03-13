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

// async function editTask(task) {
//   const rs = await db.one(
//     'UPDATE "tasks" SET name = $2 WHERE id = $1 RETURNING *',
//     [task.id, task.name, task.status]
//   );
// }

// async function completeTask(task) {
//   const rs = await db.one(
//     'UPDATE "tasks" SET status = $3 WHERE id = $1 RETURNING *',
//     [task.id, task.name, task.status]
//   );
// }

module.exports = {
  getAllProducts,
  getAllCarts,
  getAllPosts,
  getAllUsers,
};
