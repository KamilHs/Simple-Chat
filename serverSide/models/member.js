const { DataTypes } = require("sequelize");
const sequelize = require("../db");


const Member = sequelize.define("Member", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Member;
