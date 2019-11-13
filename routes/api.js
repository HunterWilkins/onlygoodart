let User = require("../models/users.js");
let Post = require("../models/posts.js");
let Product = require("../models/products.js");

module.exports = function(app) {
    
    app.get("/api/users/all", function(req, res) {
        User.findAll({}).then(function(results) {
            let users = [];

            results.forEach(item => {
                users.push(item.username);
            });

            res.send(users);
        }).catch(err => console.log(err));
    });

    app.get("/api/products/all", function(req, res) {
        Product.findAll({}).then(function(results) {
            res.json(results);
        }).catch(err => console.log(err));
    });

    app.get("/api/posts/:id", function(req, res) {
        Post.findAll({
            where: {
                author: req.params.id
            }
        }).then(function(result) {
            res.json(result);
        }).catch(err => console.log(err));
    });

    app.post("/api/account", function(req, res) {

        console.log(req.body);

        if (req.body.method === "signup") {
            User.create({
                username: req.body.username,
                password: req.body.password
            }).then(function(results) {
                res.json(results);
            }).catch(err => console.log(err));
        }

        else if (req.body.method === "login") {
            User.findOne({
                where: {
                username: req.body.username,
                password: req.body.password
            }
            }).then(function(results) {
                res.json(results);
            }).catch(err => console.log(err));
        }
        
    });

    app.post("/api/product", function(req, res) {
        Product.create({
            sellerId: req.body.sellerId,
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
        }).then(function(dbProduct) {
            res.json(dbProduct);
        }).catch(err => console.log(err));
    });

    app.put("/api/update", function(req, res) {
        
        console.log(req.body);
        
        User.update({
            username: req.body.newUsername,   
        }, {
            where: {
                id: req.body.id
            }
        }).then(function(results) {
            res.json(results);
        }).catch(err => console.log(err));     
    });

    app.delete("/api/delete", function(req, res) {
        
        console.log(req.body);
        
        User.destroy({
            where: {
                id: req.body.id
            }
        }).then(function(){
            res.end();
        }).catch(err => console.log(err));
    });

    app.put("/api/posts/update", function(req, res) {
        Post.update({
            [req.body.field] : req.body.text
        }, {
            where: {
                author: req.body.author,
                id: req.body.id
            }
        }).then(function(result) {
            res.json(result);
        }).catch(err => console.log(err));
    });

    app.post("/api/submitPost", function(req, res) {
        Post.create(req.body).then(function(results){
            res.json(results);
        }).catch(err => console.log(err));
    });
}