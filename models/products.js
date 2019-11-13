let Sequelize = require("sequelize");

let connection = require("../config/connection.js");

let Product = connection.define("product", {
    customerId: Sequelize.INTEGER,
    sellerId: Sequelize.STRING,
    name: Sequelize.STRING,
    price: {
        type: Sequelize.FLOAT
    },
    quantity: Sequelize.INTEGER,
    review:{
        type: Sequelize.INTEGER,
        min: 0,
        max: 5
    } 
});

Product.sync();

module.exports = Product;