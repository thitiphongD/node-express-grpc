const client = require("./client.js");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get("/", function(req, res) {
    client.getAll(null, function(err, data) {
        if (!err) {
            res.render("customers", {results: data.customers});
        }
    });
});

app.post("/save", function(req, res) {
    let newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    };

    client.insert(newCustomer, function(err, data) {
        if (err) throw err;
        console.log("Create success", data);
        res.redirect("/");
    });
});

app.post("/update", function(req, res) {
    const updateCustomer = {
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    };

    client.update(updateCustomer, function(err, data) {
        if (err) throw err;
        console.log("Update success", data);
        res.redirect("/");
    })
})

app.post("/remove", function(req, res) {
    client.remove({id: req.body.customer_id}, (err, _) => {
        if (err) throw err;
        console.log("Removed success");
        res.redirect("/");
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, function() {console.log(`Server run port ${PORT}`)});


