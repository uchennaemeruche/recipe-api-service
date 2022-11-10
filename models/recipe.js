// models/recipe.js

const mysqlUtil = require("mysql-query-util");

mysqlUtil.setConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.connectionLimit
});

class Recipe {
    tblName = 'recipes'

    async findAll() {
        return await mysqlUtil.select(this.tblName);
    };
    async findOne(data) {
        let { params, fields } = data;
        return await mysqlUtil.select({
            tableName: this.tblName,
            fields: fields ? fields : '*',
            params: params ? params : ''
        });
    }
    async create(data) {
        const result = await mysqlUtil.insert(this.tblName, data);
        const affectedRows = result ? result.affectedRows : 0;
        return [{
            affectedRows,
            message: "New recipe created"
        }];
    }

    async update(params, data) {
        const result = await mysqlUtil.update(this.tblName, data, params);
        return [{
            affectedRows: result ? result.affectedRows : 0,
            message: "Recipe updated successfully"
        }];
    }
    async delete(params) {
        const result = await mysqlUtil.delete(this.tblName, params);
        return [{
            affectedRows: result ? result.affectedRows : 0,
            message: "Recipe deleted successfully"
        }];
    }
}


module.exports = new Recipe;