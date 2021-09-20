
let mongoose = require('mongoose');
let animalSchema = new mongoose.Schema({

    name: String,
    type: String,
    url: String,
    price: Number,
    rating: String,
    description: String,
    quantity: Number,
    owner: String,
    license: String,
    delivery: String

});

let Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal
