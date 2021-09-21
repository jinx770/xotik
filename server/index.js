( async () => {



    // ------------------------------------------------------------------------------------------------------------------------------------
    // -- DECLARATIONS
    // ------------------------------------------------------------------------------------------------------------------------------------

    let bodyParser = require('body-parser');
    let mongoose = require('mongoose');  // connecting and talking to mongodb
    let cors = require('cors'); // cross origin restriction policy -- cross origin resource sharing
    let bcrypt = require('bcryptjs'); // encryption and decryption of data
    let config = require('./config.json')

    let User = require('./models/user.js')
    let Animal = require('./models/animal.js');

    // Connecting our database to our backend
    mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@xotik.s1wn9.mongodb.net/xotik?retryWrites=true&w=majority`);



    // ------------------------------------------------------------------------------------------------------------------------------------
    // -- ANIMAL METHODS
    // ------------------------------------------------------------------------------------------------------------------------------------

    // Function for creating an animal using our createAnimal method in server.js
    let CreateAnimal = async ( ... args ) => {

        // Creating variables for every argument passed in the function
        // This purely avoids having to do spam variables and we can do it all at once!
        let [ name, type, url, price, rating, description, quantity, owner, license, delivery, comments, location ] = args

        // Checks to see if the animal being created already exists
        // Returning the animal if true and returning false if it cant be found
        let checkAnimal = await FindAnimal(name);

        // Ternary operator for checking if the animal returned is indeed an animal or
        // if it's errored and has come up with 'undefined'
        let newAnimal = checkAnimal[0] && checkAnimal[0].name || ''

        // Ternary operator, now that we've got the animal, we can check to see if the name already exists in the database
        // Can't comment on each line here since it's technically one line, i.e (condition) ? success : fail, I've just seperated it so its easier to read,
        // If the name already exists it'll return a statement saying it exists, if it doesnt then it creates a new animal using our schema in backEnd/models/animal.js
        newAnimal === name
            ? console.log(` RESULT //
            cannot find animal \n`)
            : (
                new Animal({ name, type, url, price, rating, description, quantity, owner, license, delivery, comments, location }).save()
                && console.log(` RESULT //
            animal successfully added \n`)
            )

    }

    // Basic function for finding an animal with a query
    let FindAnimal = async ( args ) => {

        // Uses the find method which returns all data with the relevant field, returns what it finds
        let foundAnimal = await Animal.find({ name: args });

        // If the returned result character count is 0 then it returns false
        // -- The find method won't error or display undefined, just an empty array, which is why we check its length
        let animalExists = foundAnimal.length === 0 ? false : foundAnimal

        // Returns the result or false
        return animalExists

    }

    // The same as above but passing through animal id
    let FindAnimalById = async ( args ) => {

        let foundAnimal = await Animal.find({ _id: args })
        let animalExists = foundAnimal.length === 0 ? false : foundAnimal
        return animalExists
    }

    // The same as above but passing through owner
    let FindAnimalByOwner = async ( args ) => {

        let foundAnimal = await Animal.find({ owner: args })
        let animalExists = foundAnimal.length === 0 ? false : foundAnimal
        return animalExists

    }

    // For gathering every animal in the database
    let FindEveryAnimal = async () => {

        // Without a query, find returns every document in the collection
        let foundAnimals = await Animal.find();

        // Returns every result in an array
        return foundAnimals

    }

    // Function for updating the animals in database
    let UpdateAnimal = async ( args ) => {

        // Creating variables for every argument passed in the function
        let { id, name, type, url, price, rating, description, quantity, owner, license, delivery, comments, location } = args

        // Finds the first result for the search query, using its name sets the new fields to the inputted arguments
        // -- Can't comment in any of this as it's also suppose to be on one line, i.e findOneAndUpdate({field: field1}, {$set: {field: field1, field: field1}, {new: true}})
        Animal.findOneAndUpdate({
            _id: id
         }, {
             $set: {
                 animal: name,
                 type: type,
                 url: url,
                 price: price,
                 rating: rating,
                 description: description,
                 quantity: quantity,
                 owner: owner,
                 license: license,
                 delivery: delivery,
                 comments: comments,
                 location: location
             }
         }, {
             new: true
         },
            (err, doc) => {

                // If something happens such as mongodb is down, it wont error but it'll console log something went wrong
                if (err) {
                    console.log(doc);
                }
            }
        );
    }

    // Function for removing an animal from the database
    let RemoveAnimal = async ( arg ) => {

        // Attempting to get an animal document result from the database using the name as a query
        let foundAnimal = await Animal.find({ _id: arg });

        // Checking to see if returned value is empty - error prevention
        let checkAnimal = foundAnimal.length === 0;

        // The condition would result in true, meaning it will move onto the deleteOne function and delete the returned animal from the database
        !checkAnimal
            ? (
                Animal.deleteOne(
                    {
                        _id: arg
                    },
                        (err, success) => {
                            console.log(` RESULT //
            successfully deleted animal \n`)
                        }
                    )
                )
            : console.log(` RESULT //
            unable to find animal to delete \n`)

    }



    // ------------------------------------------------------------------------------------------------------------------------------------
    // -- USER METHODS
    // ------------------------------------------------------------------------------------------------------------------------------------

    // Function for creating a new login
    let CreateUser = async ( ... args ) => {

        // Shorthand for creating variables, already explained :)
        let { fullName, username, phoneNo, email, description, password } = args

        // Requesting info from the database, using the username as a query
        let checkUser = await FindUser(username);

        // Checking to see if the returned data is a document, if its not then switch it to ''
        let newUser = checkUser[0] && checkUser[0].username || ''

        // If user exists then return user already exists, if it doesn't then creating and save the new user
        newUser === username
            ? console.log(` RESULT //
            user already exists \n`)
            : ( new User({ fullName, username, phoneNo, email, description, password }).save() && console.log(` RESULT //
            created user \n`))
    }

    let HashPassword = async ( password ) => {

      // Bcrypt - how many hashing rounds are done, more rounds = more encrypted
      const saltRounds = 5;

      // Hashing/Encrypting password
      const hashedPassword = bcrypt.hashSync(password, saltRounds);

      return hashedPassword;

    }

    // Basic find user function
    let FindUser = async ( username, password ) => {

        // Makes a request from the database
        // Looking for anything with its username field set to whatever argument gets passed
        let foundUser = await User.find({ username: username });

        // If user does not exist return false
        if (typeof foundUser[0] === 'undefined'){
          return false;
        }

        if (username && password){

          let passwordDB = foundUser[0].password

          //bcrypt function that compares input password to the hashed password
          let match = await bcrypt.compare(password, passwordDB);

          let result = match ? true : false

          return result
        }

        // Makes sure it exists, and isn't just an empty array, if it is then return false
        // If its not an empty array then return the actual user
        let userExists = foundUser.length === 0 ? false : foundUser

        // Returns user found
        return userExists;

    }

    // Returning userdetails
    let FindUserDetails = async ( username ) => {
        let foundUser = await User.find({ username: username });
        // console.log(foundUser);
        return foundUser;
    }

    // Even more basic function
    let FindEveryUser = async () => {

        // Makes a request to get every single user in the database as theres no query to search
        let foundUser = await User.find();

        // Returns array of every user
        return foundUser;

    }

    // Function for updating the animals in database
    let UpdateUser = async ( args ) => {

        // Creating variables for every argument passed in the function
        let { fullName, username, phoneNo, email, description, password } = args
        // console.log(args);

        User.findOneAndUpdate({
            username: username
         }, {
             $set: {
                 fullName: fullName,
                 phoneNo: phoneNo,
                 email: email,
                 description: description,
             }
         }, {
             new: true
         },
            (err, doc) => {

                // If something happens such as mongodb is down, it wont error but it'll console log something went wrong
                if (err) {
                    // console.log(doc);
                }
            }
        );
    }

    // Remove user from database function
    let RemoveUser = async ( arg ) => {

        // Makes a request to the database with username as its search query
        let foundUser = await User.find({ username: arg })

        // Checks to see if its not an empty array, returns the actual user if its not
        let checkUser = foundUser.length === 0 ? '' : foundUser

        // Checks to see if its got a username field
        let userExists = checkUser[0] && checkUser[0].username || ''

        // Deletes the entire document if the username matches
        // Logs results with a right arrow function
        userExists === arg
            ? ( User.deleteOne({username: arg}, () => {console.log(` RESULT //
            successfully deleted user \n`)}) )
            :         console.log(` RESULT //
            unable to find user \n`)

    }




    // ------------------------------------------------------------------------------------------------------------------------------------
    // -- EXPORTS
    // ------------------------------------------------------------------------------------------------------------------------------------

    // Acknowledges that the code is running without any ghost errors
    console.log('Running...\n')

    // Export our functions to the server.js so they still get ran after we require them
    module.exports = {  CreateAnimal, FindAnimal, FindEveryAnimal, UpdateAnimal, RemoveAnimal, CreateUser, FindUser, FindEveryUser, RemoveUser, HashPassword, FindAnimalById, FindAnimalByOwner, FindUserDetails, UpdateUser}


})();
