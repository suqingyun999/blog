const mysqlDb = require("mysql");

const mysqlConfig = {
  user: "root",
  password: "12341234",
  database: "blog",
  host: "127.0.0.1",
  // port: 3306,
  // timezone: '08:00'
};

var pool = mysqlDb.createPool(mysqlConfig);

exports.query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err, "数据库连接失败");
        reject(err);
      } else {
        console.log("数据库连接成功");
        connection.query(sql, values, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
          connection.release(); // 释放连接池
        });
      }
    });
  });
};
