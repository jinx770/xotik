let express = require('express');
let bodyParser = require('body-parser');
let functions = require("./index.js");

let port = 3000;
let app = express();
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true}));



// ------------------------------------------------------------------------------------------------------------------------------------



// Method for creating our animal, gets called on the client when user clicks create listing
// Gets their fields with with the request body passed when we make a request from the client
// Let me know if you need a more detailed explanation
app.post('/createAnimal', async ( req, res ) => {

    // Shorthand variable creation explained in our backEnd/index.js
    let { name, type, url, price, rating, description, quantity, owner, license, delivery } = req.body

    console.log(url.length)
    // Dunno if this will 100% work until we test it on the 13th, should create an animal in the database
    return res.send(await functions.CreateAnimal( name, type, url, price, rating, description, quantity, owner, license, delivery ))

})



// ------------------------------------------------------------------------------------------------------------------------------------



// Method for attempting to find an animal in the database
app.get('/findAnimal', async ( req, res ) => {

    // Uses the query passed in the request as its search query
    let query = req.query.q

    let id = req.query.id

    if (query) {

        console.log('query');
        return res.send(await functions.FindAnimal( query ))

    } else if (id) {

        console.log('id');
        return res.send(await functions.FindAnimalById( id ))

    } else {

        console.log('find all animals');
        return res.send(await functions.FindEveryAnimal())

    }

    // If there is no query then calls the function for find every animal in the database function
    // if ( !query ) {
    //     return res.send(await functions.FindEveryAnimal())
    // }
    //
    // // If there is a query then returns what it finds with the query as an argument
    // return res.send(await functions.FindAnimal(query))

})



// ------------------------------------------------------------------------------------------------------------------------------------



// Method for updating fields of an animal document in the database
app.post('/updateAnimal', async ( req, res ) => {

    // Shorthand variable creation
    let { name, type, url, price, rating, description, quantity, owner, license, delivery } = req.body

    // Calling function in backEnd/index.js with relevant arguments being passed
    return res.send(await functions.UpdateAnimal( name, type, url, price, rating, description, quantity, owner, license, delivery ))

})



// ------------------------------------------------------------------------------------------------------------------------------------



// Remove animal from database method
app.delete('/removeAnimal', async ( req, res ) => {

    // Use case would probably be when we click on an animal card and press remove or take away
    // It'll get the name of what we click on an pass it in this method to remove it from the database
    let animal = req.body.name

    // Calls the function to remove it's argument
    return res.send(await functions.RemoveAnimal( animal ))
})



// ------------------------------------------------------------------------------------------------------------------------------------



// For creating a user via our sign up system, will probably remove some of the fields later on :)
app.post('/createUser', async ( req, res ) => {

    // Shorthand variable creation
    let { fullName, username, phoneNo, email, description, password } = req.body;
    console.log(password);
    // Hashes the password through function
    let hashedPassword = await functions.HashPassword(password)

    // Calling the create user function with relevant fields
    return res.send(await functions.CreateUser( fullName, username, phoneNo, email, description, hashedPassword ))

})



// ------------------------------------------------------------------------------------------------------------------------------------



// Searching for a user method
app.get('/findUser', async ( req, res ) => {

    let username = req.query.u;
    let password = req.query.p;

    // If empty inputs, find all users
    if (!username && !password) {
      return res.send(await functions.FindEveryUser())
    }

    // Find and check user and password details
    return res.send(await functions.FindUser(username, password))
})



// ------------------------------------------------------------------------------------------------------------------------------------



// Runs frontEnd on express
app.use(express.static("client"));

// Using port 3000
app.listen(port);
