// Declarations
const bodyParser = require('body-parser');
const mongoose = require('mongoose');  // connecting and talking to mongodb
const cors = require('cors'); // cross origin restriction policy -- cross origin resource sharing
const bcrypt = require('bcryptjs'); // encryption and decryption of data

( async () => {

// -------------------------------------------------------------------------------------------------------------------------------

    let Animal = require("./models/animal.js")
    mongoose.connect('mongodb+srv://alder:not123to1@xotik.s1wn9.mongodb.net/xotik?retryWrites=true&w=majority');

// -------------------------------------------------------------------------------------------------------------------------------

    // Create
    let CreateAnimal = ( ... args ) => {

        let [ name, url, price, rating, description, quantity ] = args
        let newAnimal = new Animal({ name, url, price, rating, description, quantity });

        // Check if user is allowed if not, return else continue
        // Check to see if it already exists by using the search findAnimal function, if it exists return exists

        newAnimal.save();
        console.log("Successfully created: \n", newAnimal);

    }

// -------------------------------------------------------------------------------------------------------------------------------

    // Read / View
    let FindAnimal = async ( args, callback ) => {
        // Figure out a way to accept and search multiple queries
        // Filter through returned objects

        let foundAnimal = await Animal.find({ name: args });
        return foundAnimal

    }

// -------------------------------------------------------------------------------------------------------------------------------

    // Update
    let UpdateAnimal = async ( ... args ) => {

        // Get all inputs from field when submit is pressed and update in table below
        let [ name, url, price, rating, description, quantity ] = args

        Animal.findOneAndUpdate({
            animal: "Rhino"
         }, {
             $set: {
                 animal: name,
                 url: url,
                 price: price,
                 rating: rating,
                 description: description,
                 quantity: quantity
             }
         }, {
             new: true
         },
            (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
                console.log(doc);
            }
        );
    }

// -------------------------------------------------------------------------------------------------------------------------------

    // Remove / Delete
    let RemoveAnimal = ( arg ) => {

        // Check to see if it exists using Find,
        // If it does double check if they want to delete it,

        Animal.deleteOne({ name: arg }, function(err, success){
            console.log(`Successfully deleted: ${arg}`)
        });


    }

// -------------------------------------------------------------------------------------------------------------------------------

    // Code runs here

    // console.log(await FindAnimal( "Rhino" ));
    // RemoveAnimal( "Rhino" );
    // CreateAnimal( "Rhino", "http://google.com/images", 300, "5/5", "Lorem Ipsum", 3 )
    // UpdateAnimal( "Rhino", "http://google.com/images", 300, "2/5", "Lorem Ipsum", 3 )


// -------------------------------------------------------------------------------------------------------------------------------

})();
