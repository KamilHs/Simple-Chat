const { DataTypes } = require("sequelize");
const sequelize = require("../db");


const Chat = sequelize.define("Chat", {
    Id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },

    creator: {
        type: DataTypes.STRING,
        allowNull: false
    }
})


module.exports = Chat;