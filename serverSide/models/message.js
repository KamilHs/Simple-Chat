const { DataTypes } = require("sequelize");
const sequelize = require("../db");


const Message = sequelize.define("Message", {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = Message;