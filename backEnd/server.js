let express = require('express');
let app = express();
let functions = require("./index.js")
let port = 3000;
let path = require("path")

app.post('/createAnimal', async (req, res) =>{
    let { name, tags, url, price, rating, description, quantity} = req.body
    return res.send(await functions.CreateAnimal( name, tags, url, price, rating, description, quantity ))
})

app.get('/findAnimal', async (req, res) =>{
    let query = req.query.q
    if (!query) {
        return res.send(await functions.FindEveryAnimal())
    }
    return response.send(await functions.FindAnimal(query))
})

app.post('/updateAnimal', async (req, res) =>{
    let { name, tags, url, price, rating, description, quantity} = req.body
    return res.send(await functions.UpdateAnimal( name, tags, url, price, rating, description, quantity ))
})

app.delete('/removeAnimal', async (req, res) =>{
    let animal = req.body.name
    return res.send(await functions.RemoveAnimal ( animal ))
})

app.use(express.static("frontEnd"));
app.listen(port);
