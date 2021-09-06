const express = require('express');
const app = express();
require("./index.js")

app.use(express.static("frontEnd"));
const port = 3000;
app.listen(port, () => console.log(`XOTIK Back End is listening on port : ${port}`));
