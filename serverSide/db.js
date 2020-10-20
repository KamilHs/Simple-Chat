const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    port: 3306
});


module.exports = sequelize;
