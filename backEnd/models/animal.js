let mongoose = require('mongoose');

let animalSchema = new mongoose.Schema({

    name: String,
    url: String,
    price: Number,
    rating: String,
    description: String,

});

let Animal = mongoose.model(
    'Animal', animalSchema
);

module.exports = Animal
