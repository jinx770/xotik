const mongoose = require('mongoose');

let animalSchema = new mongoose.Schema({

    fullName: String,
    username: String,
    phoneNo: String,
    email: String,
    description: String,
    password: String

});

module.exports = mongoose.model('User', animalSchema);
