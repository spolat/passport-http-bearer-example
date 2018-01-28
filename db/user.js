const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    username: { type: String },
    token: { type: String },
    email: { type: String }
});

Schema.statics.findByToken = function (token, callback) {
    this.find({ token }, function(err, user) {
        if (err) return callback(err);
        return callback(null, user);
    });
}

const Users = mongoose.model("users", Schema);

module.exports = {
    user: Users
}

