//  utils/database.js

const mysqlUtil = require("mysql-query-util");

const DbConfig = async() =>{
    mysqlUtil.setConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectionLimit: process.env.connectionLimit
    });

   try {
    // Create Database and Table using the rawQuery method
     await mysqlUtil.rawQuery(`CREATE DATABASE IF NOT EXISTS recipe_db`)

     await mysqlUtil.rawQuery(`CREATE TABLE IF NOT EXISTS recipe_db.recipes(
            id INT AUTO_INCREMENT PRIMARY KEY, 
            author VARCHAR(100) NOT NULL,
            title VARCHAR(100) NOT NULL, 
            content VARCHAR(255), 
            likes INT(10), 
            createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)`
        )
   } catch (error) {
    console.log(err)
    return err
   }
}

module.exports = DbConfig