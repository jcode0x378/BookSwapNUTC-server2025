
var mysql = require('mysql2');
const { dbConfig } = require('../../../config');
var pool = mysql.createPool(dbConfig);

var db = {};

db.query = function (sql, params) {
  return new Promise((resolve, reject) => {

    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
        return;
      }

      connection.query(sql, params, function (error, results, fields) {
        console.log(`${sql}=>${params}`);

        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  });
};

module.exports = db;
