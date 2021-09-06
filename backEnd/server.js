
let express = require('express');
let app = express();
require("./index.js")

app.use(express.static("frontEnd"));
app.listen(3000)
