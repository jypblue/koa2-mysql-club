const mysql = require('mysql')
const config = require('../config')
const dbConf = config.database

const pool = mysql.createPool({
  host: dbConf.HOST,
  user: dbConf.USERNAME,
  password: dbConf.PASSWORD,
  database: dbConf.DATABASE
})

const query = (sql, values) => {
  return new Promise((resolve, reject) => {

    pool.getConnection((err, connection) => {
      if(err) {
        resolve(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if(err) {
            reject(err);
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

// 建表
const createTable = (sql) => {
  return query(sql, []);
}

// 通过id查找数据
const findDataById = (table, id) => {
 const sql = 'SELECT * FROM ?? WHERE id = ? '
 return query(sql, [table, id, start, end])
}

// 数据分页
const findDataByPage = (table, keys, start, end) => {
  const sql = 'SELECT ?? FROM ?? LIMIT ? , ?'
  return query(sql, [keys, table, start, end])
}

// 插入数据
const insertData = (table, values) => {
  const sql = 'INSERT INTO ?? SET ?'
  return query(sql, [table, values])
}

// 更新数据
const updateData = (table, values, id) => {
  const sql = 'UPDATE ?? SET ? WHERE id = ?'
  return query(sql, [table, values, id])
}

//根据id删除数据
const deleteDataById = (table, id) => {
  const sql = 'DELETE FROM ?? WHERE id = ?'
  return query(sql, [table, id])
}

const select = (table, keys) => {
  const sql = 'SELECT ?? FROM ??'
  return query(sql, [keys, table])
}

const count = (table) => {
  const sql = 'SELECT COUNT(*) AS total_count FROM ?? '
  return query(sql, [ table ])
}

module.exports = {
  query,
  createTable,
  findDataById,
  findDataByPage,
  deleteDataById,
  insertData,
  updateData,
  select,
  count
}