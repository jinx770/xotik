const express = require('express'); //includes express
const app = express(); //calls the express method
const bodyParser = require('body-parser');
const mongoose = require('mongoose');  //mongoooose for connecting and talking to mongodb
const cors = require('cors'); //for the cross origin restriction policy -- cross origin resource sharing
const bcrypt = require('bcryptjs'); //for encryption and decryption of data
const port = 3000;

// listening to viewport
app.listen(port, () => console.log(`XOTIK Back End is listening on port : ${port}`));
