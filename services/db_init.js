//  services/db_init.js

const mysqlUtil = require("mysql-query-util");

mysqlUtil.setConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

mysqlUtil.rawQuery("CREATE DATABASE IF NOT EXISTS recipe_db").then((result) => {
    const sql = `CREATE TABLE IF NOT EXISTS recipe_db.recipes(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
         description VARCHAR(255),
         likes INT(10),
         createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
         )`

    mysqlUtil.rawQuery(sql).then(res => {
        console.log("Table created successfully")
    })

}).catch((err) => {
    console.log(err)
    return err
})