


// ------------------------------------------------------------------------------------------------------------------------------------
// -- DECLARATIONS
// ------------------------------------------------------------------------------------------------------------------------------------

let express = require('express');
let bodyParser = require('body-parser');
let functions = require("./index.js");

let port = 3000;
let app = express();

// Making more space for our images
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true}));



// ------------------------------------------------------------------------------------------------------------------------------------
// -- ANIMAL REQUESTS
// ------------------------------------------------------------------------------------------------------------------------------------

// Method for creating our animal, gets called on the client when user clicks create listing
// Gets their fields with with the request body passed when we make a request from the client
app.post('/createAnimal', async ( req, res ) => {

    // Shorthand variable creation explained in our backEnd/index.js
    let { name, type, url, price, rating, description, quantity, owner, license, delivery, comments, location } = req.body

    console.log(`\n TASK //
            creating animal \n`)

    // Dunno if this will 100% work until we test it on the 13th, should create an animal in the database
    return res.send(await functions.CreateAnimal( name, type, url, price, rating, description, quantity, owner, license, delivery, comments, location ))

})

// Method for attempting to find an animal in the database
app.get('/findAnimal', async ( req, res ) => {

    let id = req.query.id
    let owner = req.query.owner

    if (owner) {
        console.log(`\n TASK //
            return user's animals \n`)
        return res.send(await functions.FindAnimalByOwner( owner ))
    } else if (!id) {
          console.log(`\n TASK //
              return all animals \n`)
          return res.send(await functions.FindEveryAnimal())
    } else {
        // Uses the query passed in the request as its search query
        console.log(`\n TASK //
                return searched animal \n`)
        return res.send(await functions.FindAnimalById( id ))
    }

})

// Method for updating fields of an animal document in the database
app.post('/updateAnimal', async ( req, res ) => {

    // Shorthand variable creation
    let { id, name, type, url, price, rating, description, quantity, owner, license, delivery, comments, location } = req.body

    // console.log(animal);
    // console.log(`\n TASK //
    //         removing animal \n`)

    // Calling function in backEnd/index.js with relevant arguments being passed
    return res.send(await functions.UpdateAnimal({ id, name, type, url, price, rating, description, quantity, owner, license, delivery, comments, location }))

})

// Remove animal from database method
app.delete('/removeAnimal', async ( req, res ) => {

    // Use case would probably be when we click on an animal card and press remove or take away
    // It'll get the name of what we click on an pass it in this method to remove it from the database
    let animal = req.body.id

    console.log(`\n TASK //
            removing animal \n`)

    // Calls the function to remove it's argument
    return res.send(await functions.RemoveAnimal( animal ))
})



// ------------------------------------------------------------------------------------------------------------------------------------
// -- USER REQUESTS
// ------------------------------------------------------------------------------------------------------------------------------------

// For creating a user via our sign up system, will probably remove some of the fields later on :)
app.post('/createUser', async ( req, res ) => {

    // Shorthand variable creation
    let { fullName, username, phoneNo, email, description, password } = req.body;

    // Hashes the password through function
    let hashedPassword = await functions.HashPassword(password)

    console.log(`\n TASK //
            creating user \n`)

    // Calling the create user function with relevant fields
    return res.send(await functions.CreateUser( fullName, username, phoneNo, email, description, hashedPassword ))

})

// Method for updating fields of an animal document in the database
app.post('/updateUser', async ( req, res ) => {

    // Shorthand variable creation
    let { fullName, username, phoneNo, email, description } = req.body

    // Calling function in backEnd/index.js with relevant arguments being passed
    return res.send(await functions.UpdateUser({ fullName, username, phoneNo, email, description }))

})

// Searching for a user method
app.get('/findUser', async ( req, res ) => {

    let username = req.query.u;
    let password = req.query.p;

    // If empty inputs, find all users
    if (!username && !password) {
      return res.send(await functions.FindEveryUser())
    }

    console.log(`\n TASK //
            searching for user \n`)

    // Find and check user and password details
    return res.send(await functions.FindUser(username, password))
})

// Finding specific user's details
app.get('/findUserDetails', async ( req, res ) => {

    let username = req.query.u;

    //returning user details
    return res.send(await functions.FindUserDetails(username))
})



// ------------------------------------------------------------------------------------------------------------------------------------
// -- RUNNING
// ------------------------------------------------------------------------------------------------------------------------------------

// Runs frontEnd on express
app.use(express.static("client"));

// Using port 3000
app.listen(port);
