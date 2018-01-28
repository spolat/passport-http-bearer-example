const express = require("express");
const passport = require("passport");
const bearerStrategy = require("passport-http-bearer");
const User = require("./db/user").user;
const mongoose = require("mongoose");
const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/denemeDB", (err, db) => {
    if (err) throw err;
    if (db) console.log("connected to mongo");
});


passport.use(new bearerStrategy(
    function (token, cb) {
        User.findByToken(token, function (err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            return cb(null, user);
        });
    }));

app.get('/',
    passport.authenticate('bearer', { session: false }),
    function (req, res) {
        res.json({ username: req.user[0].username, email: req.user[0].email });
    });

function createExampleUsers() {

    const newUser = new User({
        username: "suat", token: "123456", email: "thunderat074@gmail.com"
    });

    newUser.save((err, result) => {
        if (err) throw err;
        if (result) {
            console.log(result);

            if (err) {
                console.log(err, stack);
            }
        }
    });
}

app.listen(port, (err) => {
    if (err) console.log(err.stack);
    else {
        // Remove all existing users before save
        User.remove({}, (err) => {
            if (err) console.log(err.stack);
            createExampleUsers();
            console.log(`App listening on port:${port}`);
        });
    }
});