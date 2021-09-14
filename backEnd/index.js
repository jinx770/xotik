( async () => {

    // Declarations
    let bodyParser = require('body-parser');
    let mongoose = require('mongoose');  // connecting and talking to mongodb
    let cors = require('cors'); // cross origin restriction policy -- cross origin resource sharing
    let bcrypt = require('bcryptjs'); // encryption and decryption of data
    let config = require('./config.json')

    let User = require('./models/user.js')
    let Animal = require("./models/animal.js");

    // Connecting our database to our backend
    mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@xotik.s1wn9.mongodb.net/xotik?retryWrites=true&w=majority`);



// ------------------------------------------------------------------------------------------------------------------------------------



    // Function for creating an animal using our createAnimal method in server.js
    let CreateAnimal = async ( ... args ) => {

        // Creating variables for every argument passed in the function
        // This purely avoids having to do spam variables and we can do it all at once!
        let [ name, type, url, price, rating, description, quantity, owner, license, delivery ] = args

        // Checks to see if the animal being created already exists
        // Returning the animal if true and returning false if it cant be found
        let checkAnimal = await FindAnimal(name);

        // Ternary operator for checking if the animal returned is indeed an animal or
        // if it's errored and has come up with "undefined"
        let newAnimal = checkAnimal[0] && checkAnimal[0].name || ""

        // Ternary operator, now that we've got the animal, we can check to see if the name already exists in the database
        // Can't comment on each line here since it's technically one line, i.e (condition) ? success : fail, I've just seperated it so its easier to read,
        // If the name already exists it'll return a statement saying it exists, if it doesnt then it creates a new animal using our schema in backEnd/models/animal.js
        newAnimal === name
            ? console.log("Animal already exists in the database!")
            : (
                new Animal({ name, type, url, price, rating, description, quantity, owner, license, delivery }).save()
                && console.log("Animal added to the database!")
            )

    }



// ------------------------------------------------------------------------------------------------------------------------------------



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



// ------------------------------------------------------------------------------------------------------------------------------------



    // For gathering every animal in the database
    let FindEveryAnimal = async () => {

        // Without a query, find returns every document in the collection
        let foundAnimals = await Animal.find();

        // Returns every result in an array
        return foundAnimals

    }



// ------------------------------------------------------------------------------------------------------------------------------------



    // Function for updating the animals in database
    let UpdateAnimal = async ( ... args ) => {

        // Creating variables for every argument passed in the function
        let [ name, tags, url, price, rating, description, quantity ] = args

        // Finds the first result for the search query, using its name sets the new fields to the inputted arguments
        // -- Can't comment in any of this as it's also suppose to be on one line, i.e findOneAndUpdate({field: field1}, {$set: {field: field1, field: field1}, {new: true}})
        Animal.findOneAndUpdate({
            animal: name
         }, {
             $set: {
                 animal: name,
                 tags: tags,
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

                // If something happens such as mongodb is down, it wont error but it'll console log something went wrong
                if (err) {
                    console.log("Something wrong when updating data!");
                }
                console.log(doc);
            }
        );
    }



// ------------------------------------------------------------------------------------------------------------------------------------



    // Function for removing an animal from the database
    let RemoveAnimal = async ( arg ) => {

        // Attempting to get an animal document result from the database using the name as a query
        let foundAnimal = await Animal.find({ name: arg });

        // Checking to see if the returned data is indeed data or an empty array (explained already above)
        let checkAnimal = foundAnimal.length === 0 ? '' : foundAnimal

        // Ternary op for setting a variable as the username of the result or nothing if it doesn't exist, error prevention !
        let animalExists = checkAnimal[0] && checkAnimal[0].name || ""

        // Another ternary operator for comparing the animal returned's username with the inputted argument
        // The condition would result in true, meaning it will move onto the deleteOne function and delete the returned animal from the database
        animalExists === arg
            ? (
                Animal.deleteOne(
                    {
                        name: arg
                    },
                        (err, success) => {
                            console.log(`Successfully deleted: ${arg}`)
                        }
                    )
                )
            : console.log("Animal does not exist")

    }



// -------------------------------------------------------------------------------------------------------------------------------



    // Function for creating a new login
    let CreateUser = async ( ... args ) => {

        // Shorthand for creating variables, already explained :)
        let [ fullName, username, phoneNo, email, description, password ] = args

        // Requesting info from the database, using the username as a query
        let checkUser = await FindUser(username);

        // Checking to see if the returned data is a document, if its not then switch it to ""
        let newUser = checkUser[0] && checkUser[0].username || ""

        // If user exists then return user already exists, if it doesn't then creating and save the new user
        newUser === username
            ? console.log("User already exists")
            : ( new User({ fullName, username, phoneNo, email, description, password }).save() && console.log("User created"))
    }



// -------------------------------------------------------------------------------------------------------------------------------



    let HashPassword = async ( password ) => {

      // Bcrypt - how many hashing rounds are done, more rounds = more encrypted
      const saltRounds = 2;

      // Hashing/Encrypting password
      const hashedPassword = bcrypt.hashSync(password, saltRounds);

      return hashedPassword;

    }



// -------------------------------------------------------------------------------------------------------------------------------



    // Basic find user function
    let FindUser = async ( arg ) => {

        // Makes a request from the database
        // Looking for anything with its username field set to whatever argument gets passed
        let foundUser = await User.find({ username: arg });

        // Makes sure it exists, and isn't just an empty array, if it is then return false
        // If its not an empty array then return the actual user
        let userExists = foundUser.length === 0 ? false : foundUser

        // Returns user found
        return userExists;

    }



// -------------------------------------------------------------------------------------------------------------------------------



    // Even more basic function
    let FindEveryUser = async () => {

        // Makes a request to get every single user in the database as theres no query to search
        let foundUser = await User.find();

        // Returns array of every user
        return foundUser;

    }



// -------------------------------------------------------------------------------------------------------------------------------



    // Remove user from database function
    let RemoveUser = async ( arg ) => {

        // Makes a request to the database with username as its search query
        let foundUser = await User.find({ username: arg })

        // Checks to see if its not an empty array, returns the actual user if its not
        let checkUser = foundUser.length === 0 ? '' : foundUser

        // Checks to see if its got a username field
        let userExists = checkUser[0] && checkUser[0].username || ""

        // Deletes the entire document if the username matches
        // Logs results with a right arrow function
        userExists === arg
            ? ( User.deleteOne({username: arg}, () => {console.log(`Successfully deleted ${arg}`)}) )
            : console.log("User does not exist")

    }



// -------------------------------------------------------------------------------------------------------------------------------



    // Acknowledges that the code is running without any ghost errors
    console.log("Running...")

    // Export our functions to the server.js so they still get ran after we require them
    module.exports = {  CreateAnimal, FindAnimal, FindEveryAnimal, UpdateAnimal, RemoveAnimal, CreateUser, FindUser, FindEveryUser, RemoveUser, HashPassword}
    //rane added password


})();



























// Dummy Data
      // CreateUser(
      //     "John Doe",
      //     "johndoe123",
      //     "021324578",
      //     "johndoe@gmail.com",
      //     "Owner of really cool pythons",
      //     "myPassword"
      // )
      //
      //
      // CreateAnimal(
      //     "Leatherback Turtle",
      //     [
      //         'turtle',
      //         'white',
      //         'large',
      //         'black',
      //         'leatherback',
      //         'australia'
      //     ],
      //     "/img/animalCards/leatherTurtle.png",
      //     8999,
      //     "4/5",
      //     "The leatherback sea turtle, sometimes called the lute turtle or leathery turtle or simply the luth, is the largest of all living turtles and the heaviest non-crocodilian reptile.",
      //     3
      // )
      //
      // CreateAnimal(
      //     "White Rhino",
      //     [
      //         'rhino',
      //         'white',
      //         'large',
      //         'big',
      //         'horn',
      //         'animal',
      //         'elephant'
      //     ],
      //     "/img/animalCards/whiteRhino.png",
      //     12999,
      //     "5/5",
      //     "The white rhinoceros or square-lipped rhinoceros is the largest extant species of rhinoceros. It has a wide mouth used for grazing and is the most social of all rhino species.",
      //     1
      // )
      //
      // CreateAnimal(
      //     "Leopard Gecko",
      //     [
      //         'gecko',
      //         'leopard',
      //         'lizard',
      //         'small',
      //         'colour',
      //         'aggressive',
      //         'tiny'
      //     ],
      //     "/img/animalCards/leopardGecko.png",
      //     419,
      //     "4/5",
      //     "They are fairly small but sturdy lizards, and their common name, 'leopard gecko' refers to their spotted patterns, predominantly shades of yellow and brown. ",
      //     27
      // )
      //
      // CreateAnimal(
      //     "White Tegus",
      //     [
      //         'gecko',
      //         'white',
      //         'tegus',
      //         'small',
      //         'colour',
      //         'lizard',
      //         'tiny',
      //         'friendly'
      //     ],
      //     "/img/animalCards/whiteTegus.png",
      //     1300,
      //     "5/5",
      //     "The Argentine black and white tegu, also called the Australian giant tegu, the black and white tegu, the huge tegu.",
      //     12
      // )
      //
      // CreateAnimal(
      //     "Kangaroo",
      //     [
      //         'kangaroo',
      //         'australia',
      //         'tail',
      //         'australian',
      //         'outback',
      //         'fighting'
      //     ],
      //     "/img/animalCards/kangaroo.png",
      //     1300,
      //     "4/5",
      //     "The Argentine black and white tegu, also called the Australian giant tegu, the black and white tegu, the huge tegu.",
      //     6
      // )
      //
      // CreateAnimal(
      //     "Tasmanian Devil",
      //     [
      //         'aggressive',
      //         'bites',
      //         'teeth',
      //         'australian',
      //         'outback',
      //         'tasmania',
      //         'tasmanian',
      //         'devil'
      //     ],
      //     "/img/animalCards/tasmanianDevil.png",
      //     700,
      //     "3/5",
      //     "These famously feisty mammals have a coat of coarse brown or black fur and a stocky profile that gives them the appearance of a baby bear. Most have a white stripe or patch on their chest and light spots on their sides or rear end. ",
      //     31
      // )
      //
      // CreateAnimal(
      //     "Koala",
      //     [
      //         'cute',
      //         'adorable',
      //         'cuddle',
      //         'tiny',
      //         'outback',
      //         'soft',
      //         'koala',
      //         'australia'
      //     ],
      //     "/img/animalCards/koala.png",
      //     3699,
      //     "5/5",
      //     "Koalas are well-known for their large round head, big furry ears and big black nose. Their fur is usually grey-brown in colour with white fur on the chest, inner arms, ears and bottom. ",
      //     19
      // )
      //
      // CreateAnimal(
      //     "Meerkat",
      //     [
      //         'cute',
      //         'outback',
      //         'cats',
      //         'cat',
      //         'meercat',
      //         'soft',
      //         'koala',
      //         'weasel'
      //     ],
      //     "/img/animalCards/meerkats.png",
      //     190,
      //     "3/5",
      //     "Meerkats live in the deserts and grasslands of the southern tip of Africa. They are extremely cute, with bushy, brown-striped fur, a small, pointed face, and large eyes surrounded by dark patches. ",
      //     58
      // )
