let express = require('express');
let app = express();
let functions = require("./index.js")
let port = 3000;

// ---------------------------------------------------

app.post('/createAnimal', async ( req, res ) => {
    let { name, tags, url, price, rating, description, quantity } = req.body
    return res.send(await functions.CreateAnimal( name, tags, url, price, rating, description, quantity ))
})

// ---------------------------------------------------

app.get('/findAnimal', async ( req, res ) => {
    let query = req.query.q
    if ( !query ) {
        return res.send(await functions.FindEveryAnimal())
    }
    return res.send(await functions.FindAnimal(query))
})

// ---------------------------------------------------

app.post('/updateAnimal', async ( req, res ) => {
    let { name, tags, url, price, rating, description, quantity } = req.body
    return res.send(await functions.UpdateAnimal( name, tags, url, price, rating, description, quantity ))
})

// ---------------------------------------------------

app.delete('/removeAnimal', async ( req, res ) => {
    let animal = req.body.name
    return res.send(await functions.RemoveAnimal ( animal ))
})

// ---------------------------------------------------

app.post('/createUser', async ( req, res ) => {
    let [ fullName, username, phoneNo, email, description, password ] = req.body
    return res.send(await functions.CreateUser( fullName, username, phoneNo, email, description, password ))
})

// ---------------------------------------------------

app.get('/findUser', async ( req, res ) => {
    let query = req.query.q
    if ( !query ) {
        return res.send(await functions.FindEveryUser())
    }
    return res.send(await functions.FindUser(query))
})

// ---------------------------------------------------

app.use(express.static("frontEnd"));
app.listen(port);
