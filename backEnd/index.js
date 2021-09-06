const bodyParser = require('body-parser');
const mongoose = require('mongoose');  // connecting and talking to mongodb
const cors = require('cors'); // cross origin restriction policy -- cross origin resource sharing
const bcrypt = require('bcryptjs'); // encryption and decryption of data

// listening to viewport
( async () => {

    let Animal = require("./models/animal.js")
    let mongoose = require('mongoose');
    mongoose.connect('mongodb+srv://alder:not123to1@xotik.s1wn9.mongodb.net/xotik?retryWrites=true&w=majority');

    let CreateAnimal = (...args) => {

        let [name, url, price, rating, description] = args
        let newAnimal = new Animal({ name, url, price, rating, description });

        newAnimal.save();
        console.log(newAnimal);

    }

    let FindAnimal = (args) => {
        // Figure out a way to accept and search multiple queries
        // Filter through returned objects

        Animal.findOne({name: args}, function (err, docs) {
            console.log(docs)
        });

    }

    console.log(FindAnimal("Jeff"))

})();
