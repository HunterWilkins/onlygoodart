let Sequelize = require("sequelize");

let sequelize = new Sequelize("test", "root", "22fj8890", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
});

module.exports = sequelize;