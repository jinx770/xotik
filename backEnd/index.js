// Declarations
let bodyParser = require('body-parser');
let mongoose = require('mongoose');  // connecting and talking to mongodb
let cors = require('cors'); // cross origin restriction policy -- cross origin resource sharing
let bcrypt = require('bcryptjs'); // encryption and decryption of data
let config = require('./config.json')

let User = require('./models/user.js')
let Animal = require("./models/animal.js");

mongoose.connect(`mongodb+srv://${config.username}:${config.password}@xotik.s1wn9.mongodb.net/xotik?retryWrites=true&w=majority`);

( async () => {

// -------------------------------------------------------------------------------------------------------------------------------


    // Create
    let CreateAnimal = async ( ... args ) => {

        let [ name, tags, url, price, rating, description, quantity ] = args
        let checkAnimal = await FindAnimal(name);
        let newAnimal = checkAnimal[0] && checkAnimal[0].name || ""

        newAnimal === name
            ? console.log("Animal already exists in the database!")
            : ( new Animal({ name, tags, url, price, rating, description, quantity }).save() && console.log("Animal added to the database!"))

    }


    // Read / View
    let FindAnimal = async ( args, callback ) => {

        let foundAnimal = await Animal.find({ name: args });
        let animalExists = foundAnimal.length === 0 ? 'User does not exist' : foundAnimal

        return animalExists

    }


    // Update
    let UpdateAnimal = async ( ... args ) => {

        let [ name, tags, url, price, rating, description, quantity ] = args

        Animal.findOneAndUpdate({
            animal: "Rhino"
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
                if (err) {
                    console.log("Something wrong when updating data!");
                }
                console.log(doc);
            }
        );
    }


    // Remove / Delete
    let RemoveAnimal = async ( arg ) => {

        let foundAnimal = await Animal.find({ name: arg });
        let checkAnimal = foundAnimal.length === 0 ? '' : foundAnimal
        let animalExists = checkAnimal[0] && checkAnimal[0].name || ""

        animalExists === arg
            ? ( Animal.deleteOne({ name: arg }, function(err, success){console.log(`Successfully deleted: ${arg}`)}))
            : console.log("Animal does not exist")

    }


// -------------------------------------------------------------------------------------------------------------------------------


    let CreateUser = async ( ... args ) => {

        let [ fullName, username, phoneNo, email, description, password ] = args
        let checkUser = await FindUser(username);
        let newUser = checkUser[0] && checkUser[0].username || ""

        newUser === username
            ? console.log("User already exists")
            : ( new User({ fullName, username, phoneNo, email, description, password }).save() && console.log("User created"))


    }


    let FindUser = async ( arg ) => {

        let foundUser = await User.find({ username: arg });
        let userExists = foundUser.length === 0 ? 'User does not exist' : foundUser

        return userExists;

    }


    let RemoveUser = async ( arg ) => {

        let foundUser = await User.find({ username: arg })
        let checkUser = foundUser.length === 0 ? '' : foundUser
        let userExists = checkUser[0] && checkUser[0].username || ""

        userExists === arg
            ? ( User.deleteOne({username: arg}, function(err, success){console.log(`Successfully deleted ${arg}`)}) )
            : console.log("User does not exist")

    }


    // -------------------------------------------------------------------------------------------------------------------------------


  // Function Calls
  let Tasks = async () => {

      // console.log(await FindUser( "johndoe123" ));
      // console.log(await FindAnimal( "Rhino" ));

      CreateUser(
          "root",
          "root",
          "null",
          "null",
          "testing account",
          "password"
      )

      CreateUser(
          "John Lennon",
          "johnlennon",
          "0213 2224 584",
          "johnlennon123@gmail.com",
          "Lead singer in the beatles!",
          "johnlennon123"
      )

      // RemoveUser("johndoe");
      // RemoveAnimal( "White Rhino" );

      // UpdateAnimal( "Rhino", ['',''], "http://google.com/images", 300, "2/5", "Lorem Ipsum", 3 )

  }

  Tasks()

})();































      // CreateUser(
      //     "John Doe",
      //     "johndoe123",
      //     "021324578",
      //     "johndoe@gmail.com",
      //     "Owner of really cool pythons",
      //     "myPassword"
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
      //     "../frontEnd/img/animalCards/whiteRhino.png",
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
      //     "../frontEnd/img/animalCards/leopardGecko.png",
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
      //     "../frontEnd/img/animalCards/whiteTegus.png",
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
      //     "../frontEnd/img/animalCards/kangaroo.png",
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
      //     "../frontEnd/img/animalCards/tasmanianDevil.png",
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
      //     "../frontEnd/img/animalCards/koala.png",
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
      //     "../frontEnd/img/animalCards/meerkats.png",
      //     190,
      //     "3/5",
      //     "Meerkats live in the deserts and grasslands of the southern tip of Africa. They are extremely cute, with bushy, brown-striped fur, a small, pointed face, and large eyes surrounded by dark patches. ",
      //     58
      // )
