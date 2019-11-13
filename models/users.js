let Sequelize = require("sequelize");

let connection = require("../config/connection.js");

let User = connection.define("user", {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    customerId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    isSeller: Sequelize.BOOLEAN
});


User.sync();

module.exports = User;