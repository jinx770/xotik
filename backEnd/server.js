const express = require('express');
const app = express();
require("./index.js")

app.use(express.static("frontEnd"));
const port = 3000;
app.listen(port);
