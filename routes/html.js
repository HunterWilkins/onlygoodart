const path = require("path");

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.render("dashboard");
    });

    app.get("/store", function(req, res) {
        res.render("store");
    });
}